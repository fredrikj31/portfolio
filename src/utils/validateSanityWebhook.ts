import { isValidSignature } from "@sanity/webhook";

interface ValidateSanityWebhookOptions {
  body: string;
  signature: string | string[] | undefined;
}

export const validateSanityWebhook = async ({ body, signature }: ValidateSanityWebhookOptions): Promise<boolean> => {
  const sanityWebhookSecret = process.env.SANITY_WEBHOOK_SECRET;
  if (!sanityWebhookSecret) {
    console.error("Sanity webhook secret is not defined.");
    return false;
  }

  if (!signature) {
    console.error("Signature is undefined.");
    return false;
  }

  if (signature instanceof Array) {
    console.error("Signature is an array.", signature);
    return false;
  }

  return isValidSignature(body, signature, sanityWebhookSecret);
};
