#!/usr/bin/env bash
# Pushes selected env vars from .env.local to Vercel Preview environment via REST API.
# Bypasses Vercel CLI v53 bug requiring git branch even when no git repo is connected.
# Does not echo values to stdout/stderr.
set -eu

TOKEN=$(jq -r '.token' "$HOME/Library/Application Support/com.vercel.cli/auth.json")
PROJECT_ID="prj_YTdwb0AJWSBWC7kghKEN0now3scf"
TEAM_ID="team_DZkCYahSFiCZo2R9ZVZHQ1s4"
API="https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM_ID"

extract() {
  awk -v k="$1" -F'=' '
    index($0, k"=") == 1 {
      val = substr($0, length(k)+2)
      sub(/^["'"'"']/, "", val)
      sub(/["'"'"']$/, "", val)
      print val
      exit
    }
  ' .env.local
}

VARS=(STRIPE_SECRET_KEY NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY STRIPE_WEBHOOK_SECRET RESEND_API_KEY EMAIL_FROM SANITY_API_WRITE_TOKEN)

for V in "${VARS[@]}"; do
  val="$(extract "$V")"
  if [ -z "$val" ]; then
    echo "⚠️  $V: leer in .env.local — übersprungen"
    continue
  fi

  # Build JSON body via jq (handles escaping of value safely)
  body=$(jq -nc \
    --arg key "$V" \
    --arg value "$val" \
    '{key: $key, value: $value, type: "encrypted", target: ["preview"]}')

  # POST and capture status code separately from body
  resp=$(curl -s -w "\n__HTTP__%{http_code}" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -X POST "$API" \
    -d "$body")
  http=$(echo "$resp" | grep "__HTTP__" | sed 's/.*__HTTP__//')
  json=$(echo "$resp" | sed '/__HTTP__/d')

  case "$http" in
    20*)
      echo "✅ $V (${#val} Zeichen) → preview"
      ;;
    409)
      # Already exists — overwrite via PATCH
      existing_id=$(echo "$json" | jq -r '.error.envs[0].id // empty')
      if [ -n "$existing_id" ]; then
        patch_body=$(jq -nc --arg value "$val" '{value: $value, target: ["preview"]}')
        curl -s -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
          -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID/env/$existing_id?teamId=$TEAM_ID" \
          -d "$patch_body" >/dev/null
        echo "🔄 $V (${#val} Zeichen) → preview (überschrieben)"
      else
        echo "⚠️  $V Konflikt aber keine ID gefunden:"
        echo "$json" | jq -r '.error.message // .' | sed 's/^/   /'
      fi
      ;;
    *)
      echo "❌ $V — HTTP $http"
      echo "$json" | jq -r '.error.message // .' | sed 's/^/   /'
      ;;
  esac
done

echo "---"
echo "Aktueller Stand der Preview-Vars:"
curl -s -H "Authorization: Bearer $TOKEN" "$API" \
  | jq -r '.envs[] | select(.target | index("preview")) | .key' \
  | sort
