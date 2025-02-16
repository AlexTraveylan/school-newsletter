import jwt from "jsonwebtoken"
import { Admin, TokenPayload, tokenPayloadSchema } from "./types"

export class JWTAdminService {
  private readonly secretKey: string
  private readonly tokenExpiration: string

  constructor(
    secretKey: string = process.env.JWT_SECRET_KEY || "votre-clé-secrète-par-défaut",
    tokenExpiration: string = "24h"
  ) {
    this.secretKey = secretKey
    this.tokenExpiration = tokenExpiration
  }

  public encode(admin: Admin): string {
    const payload: TokenPayload = {
      username: admin.username,
      isSuperAdmin: admin.isSuperAdmin,
    }

    try {
      // @ts-expect-error : I don't how to fix it
      return jwt.sign(payload, this.secretKey, {
        expiresIn: this.tokenExpiration,
      })
    } catch (error) {
      throw new Error(`Erreur lors de l'encodage du token: ${error}`)
    }
  }

  public decode(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secretKey)
      const validatedPayload = tokenPayloadSchema.parse(decoded)

      return {
        username: validatedPayload.username,
        isSuperAdmin: validatedPayload.isSuperAdmin,
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Token invalide")
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expiré")
      }
      throw new Error(`Erreur lors du décodage du token: ${error}`)
    }
  }
}
