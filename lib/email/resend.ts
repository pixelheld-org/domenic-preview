import "server-only";
import { Resend } from "resend";

const KEY = process.env.RESEND_API_KEY;

if (!KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

export const resend = new Resend(KEY);

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
