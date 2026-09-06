import { useState } from "react";
import {
  useClient,
  type DocumentActionComponent,
  type DocumentActionDescription,
  type DocumentActionProps,
  type SanityDocument,
} from "sanity";
import { CheckmarkCircleIcon, CreditCardIcon } from "@sanity/icons";

type VoucherDoc = SanityDocument & {
  code?: string;
  productType?: string;
  sessionsTotal?: number;
  sessionsRemaining?: number;
  customAmount?: number;
  customAmountRemaining?: number;
  status?: string;
};

function isBlock(productType?: string): boolean {
  return Boolean(productType && productType.startsWith("block_"));
}

function isCustom(productType?: string): boolean {
  return productType === "voucher_custom";
}

function nextStatus(remaining: number): string {
  if (remaining <= 0) return "fully_redeemed";
  return "partially_redeemed";
}

// Theme-aware styles using Sanity CSS vars (Light/Dark Mode kompatibel).
// Wird in beide Dialoge gemounted — Sanity Studio dedupliziert
// gleiche <style>-Inhalte nicht, aber Auswirkung ist vernachlässigbar.
const DIALOG_STYLES = `
  .redeem-label {
    display: block;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--card-muted-fg-color, #6b6b6b);
    font-weight: 500;
  }
  .redeem-label > span {
    display: block;
    margin-bottom: 0.375rem;
    color: var(--card-fg-color, #1a1a1a);
  }
  .redeem-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--card-border-color, hsl(220, 10%, 78%));
    border-radius: 3px;
    background: var(--card-bg-color, white);
    color: var(--card-fg-color, #1a1a1a);
    font: inherit;
    font-size: 0.9375rem;
    outline: none;
    transition: border-color 0.12s ease, box-shadow 0.12s ease;
  }
  .redeem-input::placeholder {
    color: var(--card-muted-fg-color, #9a9a9a);
    opacity: 0.7;
  }
  .redeem-input:hover {
    border-color: var(--card-border-color, hsl(220, 10%, 60%));
  }
  .redeem-input:focus {
    border-color: var(--card-focus-ring-color, hsl(210, 80%, 55%));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--card-focus-ring-color, hsl(210, 80%, 55%)) 25%, transparent);
  }
  .redeem-actions {
    margin-top: 1.25rem;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  .redeem-btn {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.12s ease, border-color 0.12s ease;
  }
  .redeem-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .redeem-btn-primary {
    border: 1px solid transparent;
    background: var(--card-tone-positive-bg-color, hsl(150, 60%, 38%));
    color: var(--card-tone-positive-fg-color, white);
  }
  .redeem-btn-primary:hover:not(:disabled) {
    background: var(--card-tone-positive-bg-color-hover, hsl(150, 60%, 32%));
    filter: brightness(0.95);
  }
  .redeem-btn-secondary {
    border: 1px solid var(--card-border-color, hsl(220, 10%, 78%));
    background: transparent;
    color: var(--card-fg-color, #1a1a1a);
  }
  .redeem-btn-secondary:hover:not(:disabled) {
    background: var(--card-bg-color-hover, color-mix(in srgb, currentColor 6%, transparent));
  }
  .redeem-summary {
    margin: 0.75rem 0;
    padding: 0.625rem 0.75rem;
    background: color-mix(in srgb, var(--card-fg-color, #000) 5%, transparent);
    border-radius: 3px;
    font-size: 0.875rem;
    color: var(--card-fg-color, #1a1a1a);
  }
  .redeem-summary strong {
    font-weight: 700;
  }
`;

export const RedeemBlockSessionAction: DocumentActionComponent = (
  props: DocumentActionProps,
): DocumentActionDescription | null => {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const [running, setRunning] = useState(false);

  const doc = (props.draft || props.published) as VoucherDoc | null;
  if (!doc || !isBlock(doc.productType)) return null;

  const remaining = doc.sessionsRemaining ?? doc.sessionsTotal ?? 0;
  if (remaining <= 0) return null;

  return {
    label: `Behandlung einlösen · ${remaining} übrig`,
    icon: CheckmarkCircleIcon,
    tone: "positive",
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen
      ? {
          type: "dialog",
          header: "Behandlung einlösen",
          onClose: () => setDialogOpen(false),
          content: (
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <style>{DIALOG_STYLES}</style>
              <div className="redeem-summary">
                Eine Behandlung von <strong>{doc.code}</strong> einlösen.
                <br />
                Danach bleiben <strong>{remaining - 1}</strong> von {doc.sessionsTotal} übrig.
              </div>

              <label className="redeem-label">
                <span>Notiz (optional)</span>
                <input
                  className="redeem-input"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="z.B. Heilmassage 60 Min am 12.05.2026"
                />
              </label>

              <div className="redeem-actions">
                <button
                  type="button"
                  className="redeem-btn redeem-btn-secondary"
                  onClick={() => setDialogOpen(false)}
                  disabled={running}
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  className="redeem-btn redeem-btn-primary"
                  disabled={running}
                  onClick={async () => {
                    setRunning(true);
                    try {
                      const newRemaining = remaining - 1;
                      const newStatus = nextStatus(newRemaining);
                      await client
                        .patch(props.id)
                        .setIfMissing({ redemptions: [] })
                        .append("redemptions", [
                          {
                            _key: `redemption-${Date.now()}`,
                            date: new Date().toISOString(),
                            sessionsRedeemed: 1,
                            note: note || undefined,
                          },
                        ])
                        .set({ sessionsRemaining: newRemaining, status: newStatus })
                        .commit();
                      setDialogOpen(false);
                      setNote("");
                      props.onComplete();
                    } catch (err) {
                      console.error(err);
                      alert("Fehler beim Einlösen — siehe Konsole");
                    } finally {
                      setRunning(false);
                    }
                  }}
                >
                  {running ? "Wird eingelöst…" : "Einlösen"}
                </button>
              </div>
            </div>
          ),
        }
      : undefined,
  };
};

export const RedeemCustomAmountAction: DocumentActionComponent = (
  props: DocumentActionProps,
): DocumentActionDescription | null => {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [running, setRunning] = useState(false);

  const doc = (props.draft || props.published) as VoucherDoc | null;
  if (!doc || !isCustom(doc.productType)) return null;

  const remaining = doc.customAmountRemaining ?? doc.customAmount ?? 0;
  if (remaining <= 0) return null;

  const amountNum = Number(amount);
  const validAmount = amount !== "" && amountNum > 0 && amountNum <= remaining;
  const restAfter = remaining - (amountNum || 0);

  return {
    label: `Betrag einlösen · €${remaining} übrig`,
    icon: CreditCardIcon,
    tone: "positive",
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen
      ? {
          type: "dialog",
          header: "Betrag einlösen",
          onClose: () => setDialogOpen(false),
          content: (
            <div style={{ padding: "1.25rem 1.5rem" }}>
              <style>{DIALOG_STYLES}</style>
              <div className="redeem-summary">
                Vom Gutschein <strong>{doc.code}</strong> einen Betrag einlösen.
                <br />
                Verbleibend: <strong>€{remaining}</strong>
              </div>

              <label className="redeem-label">
                <span>Betrag in €</span>
                <input
                  className="redeem-input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="1"
                  min="1"
                  max={remaining}
                  placeholder={`max. ${remaining}`}
                  autoFocus
                />
              </label>

              <label className="redeem-label">
                <span>Notiz (optional)</span>
                <input
                  className="redeem-input"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="z.B. Heilmassage 45 Min am 12.05.2026"
                />
              </label>

              {validAmount && (
                <div className="redeem-summary">
                  Restbetrag nach Einlösung: <strong>€{restAfter}</strong>
                </div>
              )}

              <div className="redeem-actions">
                <button
                  type="button"
                  className="redeem-btn redeem-btn-secondary"
                  onClick={() => setDialogOpen(false)}
                  disabled={running}
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  className="redeem-btn redeem-btn-primary"
                  disabled={running || !validAmount}
                  onClick={async () => {
                    setRunning(true);
                    try {
                      const newRemaining = remaining - amountNum;
                      const newStatus = nextStatus(newRemaining);
                      await client
                        .patch(props.id)
                        .setIfMissing({ redemptions: [] })
                        .append("redemptions", [
                          {
                            _key: `redemption-${Date.now()}`,
                            date: new Date().toISOString(),
                            amountRedeemed: amountNum,
                            note: note || undefined,
                          },
                        ])
                        .set({ customAmountRemaining: newRemaining, status: newStatus })
                        .commit();
                      setDialogOpen(false);
                      setAmount("");
                      setNote("");
                      props.onComplete();
                    } catch (err) {
                      console.error(err);
                      alert("Fehler beim Einlösen — siehe Konsole");
                    } finally {
                      setRunning(false);
                    }
                  }}
                >
                  {running ? "Wird eingelöst…" : "Einlösen"}
                </button>
              </div>
            </div>
          ),
        }
      : undefined,
  };
};
