import * as crypto from "crypto"
import { settings } from "./settings"

export class SecurityService {
  private readonly secretKey: Buffer
  private crypto: typeof crypto

  constructor() {
    this.secretKey = Buffer.from(settings.secret_key)
    this.crypto = crypto
  }

  encode(message: string): string {
    const iv = this.crypto.randomBytes(16)
    const cipher = this.crypto.createCipheriv("aes-256-cbc", this.secretKey, iv)
    let encrypted = cipher.update(message, "utf8", "base64")
    encrypted += cipher.final("base64")
    return iv.toString("base64") + ":" + encrypted
  }

  decode(encodedMessage: string): string {
    const [ivBase64, encryptedMessage] = encodedMessage.split(":")
    const iv = Buffer.from(ivBase64, "base64")
    const decipher = this.crypto.createDecipheriv("aes-256-cbc", this.secretKey, iv)
    let decrypted = decipher.update(encryptedMessage, "base64", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  }
}
