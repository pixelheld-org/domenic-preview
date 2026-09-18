# Domenic — isolated Pixelheld preview

This repository is a TEST COPY, independent of josefshamstr/domenic.
Never push, merge, deploy or connect this repository to Domenic's live repository,
live Vercel project, domains, CMS, booking system, payments or email services.
Do not remove the preview access gate, noindex headers or disabled transaction routes.

Edit website copy in `app/` and `components/` JSX via unique `data-edit-id` attributes
(portal direct text edit) or the AI chat. `preview-content/site.json` plus `sanity/`
are a rescue snapshot, not the live CMS. Image references may still point at public
Sanity CDN URLs. Never add live service credentials.
The default branch belongs to this preview copy only; portal review/approval writes
only here. Any later production rollout requires a separate explicit request.

Read package.json before implementing. This is Next.js 16; consult installed
node_modules/next/dist/docs/ for relevant APIs before changes.
