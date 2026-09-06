# Domenic — Pixelheld-Testvorschau

Isolierte Kopie von `josefshamstr/domenic`, Stand in `preview-content/source.json`.
Kein Transfer des Original-Repositories und keine Verbindung zu dessen Deployment.

- Einstieg ausschließlich über das Projekt **Domenic – Testvorschau** im Pixelheld-Portal.
- Inhalte: `preview-content/site.json` (veröffentlichter Sanity-Snapshot, ohne Gutscheine/Kundendaten).
- Keine echten Buchungen, Zahlungen, E-Mails oder Sanity-Schreibzugriffe.
- Alle Seiten tragen noindex; Vorschauzugriff erfordert den Sitzungstoken.
- Keine Live-Zugangsdaten erforderlich. `.env`-Dateien niemals hinzufügen.
- Portal-Änderungen benötigen Freigabe und werden ausschließlich in dieses Repository übernommen.
- Ein späterer Live-Rollout ist ein separater, ausdrücklich freizugebender Schritt.

`npm install`, anschließend `npm run build`. Der Portal-Editor setzt seine eigenen
PIXELHELD-Umgebungsvariablen beim Start der Sandbox.
