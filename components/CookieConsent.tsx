"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsentComponent() {
  useEffect(() => {
    let lastAnalytics: boolean | null = null;

    const syncConsentToTags = ({ emitDisable }: { emitDisable: boolean }) => {
      const analytics = CookieConsent.acceptedCategory("analytics");

      const consentState = {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        security_storage: "granted",
      } as const;

      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", consentState);
      }

      window.dataLayer = window.dataLayer || [];

      if (lastAnalytics === null || analytics !== lastAnalytics) {
        if (analytics) {
          window.dataLayer.push({ event: "cookieconsent_analytics_enable" });
        } else if (emitDisable) {
          window.dataLayer.push({ event: "cookieconsent_analytics_disable" });
        }
        lastAnalytics = analytics;
      }

      window.dataLayer.push({
        event: "consent_update",
        consent: consentState,
      });
    };

    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
              { name: /^_gat/ },
            ],
          },
          services: {
            googleTagManager: {
              label: "Google Tag Manager",
              onAccept: () => {
                // GTM runs via layout, consent is updated via syncConsentToTags
              },
              onReject: () => {
                // Cookies are cleared via autoClear above
              },
            },
          },
        },
      },

      onConsent: () => {
        syncConsentToTags({ emitDisable: true });
      },

      onChange: ({ changedCategories }) => {
        syncConsentToTags({ emitDisable: changedCategories.includes("analytics") });
      },

      language: {
        default: "de",
        translations: {
          de: {
            consentModal: {
              title: "Darf's ein Keks sein? 🍪",
              description:
                "Wir setzen Cookies ein, damit diese Website reibungslos läuft. Einige helfen uns zu verstehen, wie Besucher die Seite nutzen – anonym und ohne persönliche Daten.",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Nur das Nötigste",
              showPreferencesBtn: "Einstellungen",
              footer: `
                <a href="/impressum" target="_blank">Impressum</a>
                <a href="/datenschutz" target="_blank">Datenschutz</a>
                <a href="/agb" target="_blank">AGB</a>
              `,
            },
            preferencesModal: {
              title: "Cookie-Einstellungen",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Nur Notwendige",
              savePreferencesBtn: "Auswahl speichern",
              closeIconLabel: "Schließen",
              serviceCounterLabel: "Dienst|Dienste",
              sections: [
                {
                  title: "Ihre Privatsphäre",
                  description:
                    "Hier entscheiden Sie, welche Cookies wir verwenden dürfen. Die Auswahl können Sie jederzeit über den Link im Footer ändern.",
                },
                {
                  title: "Technisch notwendig",
                  description:
                    "Diese Cookies sind für den Betrieb der Website unerlässlich und können nicht deaktiviert werden. Dazu gehören auch Cookies von Calendly, die für die Online-Terminbuchung erforderlich sind.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analyse & Verbesserung",
                  description:
                    "Diese Cookies helfen uns zu verstehen, welche Inhalte gefragt sind. Alle Daten werden anonym erhoben.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      desc: "Beschreibung",
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: location.hostname,
                        desc: "Google Analytics: Unterscheidet Besucher anonym.",
                      },
                      {
                        name: "_gid",
                        domain: location.hostname,
                        desc: "Google Analytics: Speichert die Sitzung temporär.",
                      },
                      {
                        name: "_gat",
                        domain: location.hostname,
                        desc: "Google Analytics: Drosselt die Anfragerate.",
                      },
                    ],
                  },
                },
                {
                  title: "Weitere Infos",
                  description:
                    'Bei Fragen zu unseren Cookies können Sie uns über das <a href="/#kontakt">Kontaktformular</a> erreichen. Weitere Angaben: <a href="/impressum">Impressum</a>, <a href="/datenschutz">Datenschutz</a>, <a href="/agb">AGB</a>.',
                },
              ],
            },
          },
        },
      },

      guiOptions: {
        consentModal: {
          layout: "cloud inline",
          position: "bottom center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
    });

    // Sync consent on initial load (for returning visitors with stored consent)
    syncConsentToTags({ emitDisable: false });
  }, []);

  return null;
}
