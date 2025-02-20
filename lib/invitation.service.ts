import crypto from "crypto"

export function createInvitationUrlKey(): string {
  const randomBytes = crypto.randomBytes(10)

  return randomBytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}
