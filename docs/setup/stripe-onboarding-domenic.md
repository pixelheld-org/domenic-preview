# Stripe-Onboarding für Domenic

Diese Anleitung führt durch die Einrichtung deines Stripe-Accounts für die Gutschein-Funktion auf heilmasseur-domenic.at.

**Zeitaufwand:** ca. 15 Minuten online + 1–3 Werktage Wartezeit auf Verifizierung.

## 1. Account anlegen (5 Min)

1. Öffne https://dashboard.stripe.com/register
2. Account erstellen mit der E-Mail-Adresse, die du für die Praxis verwendest
3. Land: Österreich
4. Geschäftstyp: Einzelunternehmer

## 2. Geschäftsdaten eintragen (5 Min)

Stripe fragt nach:
- **Name & Adresse** wie auf dem Gewerbeschein
- **Steuer-ID:** UID-Nummer (falls vorhanden) oder Steuernummer
- **Bankverbindung:** IBAN für Auszahlungen
- **Identitätsnachweis:** Ausweis-Upload (Reisepass oder Führerschein)

Die Verifizierung läuft im Hintergrund (1–3 Werktage). Bis dahin nutzt Josef den **Test-Mode** für die Implementierung.

## 3. Josef einladen (2 Min)

1. **Settings → Team and security → Team**
2. **Invite member**
3. E-Mail: `josef.haras@hamstr.me`
4. Rolle: **Administrator**

Josef richtet danach die Verbindung zur Website ein (Webhooks, Produkte, API-Keys).

## 4. Receipts deaktivieren (1 Min)

Damit Käufer keine doppelten Bestätigungen bekommen (wir senden eigene mit PDF-Gutschein):

1. **Settings → Emails → Customer emails**
2. **„Successful payments" deaktivieren**
3. **„Refunds" aktiviert lassen**

## 5. Zahlungsmethoden (optional)

**Settings → Payment methods** — empfohlen:
- Karten (Visa/Mastercard) — automatisch aktiv
- Apple Pay / Google Pay — automatisch aktiv für Karten-Käufer auf Mobile
- SEPA-Lastschrift — manuell aktivieren für österreichische Käufer

## 6. Bestätigung an Josef

Wenn alle Schritte erledigt sind, sag Josef Bescheid. Er übernimmt:
- Erstellung der 7 Produkte (5er/10er-Blöcke je 30/45/60 + Einzelgutschein) auf deinem Account
- Webhook-Konfiguration
- Live-Schaltung sobald Verifizierung durch ist

## Was passiert dann?

- Käufer wählen einen Block oder Einzelgutschein auf `/gutscheine`
- Zahlung läuft direkt über Stripe (du siehst sie sofort im Dashboard)
- Stripe überweist automatisch alle 1–2 Werktage auf dein Konto
- Du verwaltest Gutschein-Einlösungen im Sanity Studio
- Stripe-Gebühr: ca. 1,5 % + 0,25 € pro Karten-Zahlung in der EU

## Fragen?

Bei Problemen melden bei `josef.haras@hamstr.me`.
