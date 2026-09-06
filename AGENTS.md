# Domenic — isolated Pixelheld preview

This repository is a TEST COPY, independent of josefshamstr/domenic.
Never push, merge, deploy or connect this repository to Domenic's live repository,
live Vercel project, domains, CMS, booking system, payments or email services.
Do not remove the preview access gate, noindex headers or disabled transaction routes.

Edit website content in `preview-content/site.json`. These are published public
content snapshots, not live CMS records. React layouts are in `app/` and `components/`.
Image references use public Sanity CDN images. Never add live service credentials.
The default branch belongs to this preview copy only; portal review/approval writes
only here. Any later production rollout requires a separate explicit request.

Read package.json before implementing. This is Next.js 16; consult installed
node_modules/next/dist/docs/ for relevant APIs before changes.
