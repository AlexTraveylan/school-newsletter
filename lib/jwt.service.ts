import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { SecurityService } from "./security.service"
import { settings } from "./settings"
import { Admin, TokenPayload, tokenPayloadSchema } from "./types"

export class JWTAdminService {
  private readonly secretKey: string
  private readonly tokenExpiration: string
  private readonly securityService: SecurityService

  constructor(
    secretKey: string = settings.jwt_secret_key,
    tokenExpiration: string = "24h"
  ) {
    this.secretKey = secretKey
    this.tokenExpiration = tokenExpiration
    this.securityService = new SecurityService()
  }

  public encode(admin: Admin): string {
    const payload: TokenPayload = {
      username: this.securityService.decode(admin.encodedUsername),
      isSuperAdmin: admin.isSuperAdmin,
    }

    try {
      // @ts-expect-error : I don't how to fix it
      return jwt.sign(payload, this.secretKey, {
        expiresIn: this.tokenExpiration,
        algorithm: "HS256",
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

export async function verifyAuth(): Promise<TokenPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")

  if (!token) {
    return null
  }

  try {
    const service = new JWTAdminService()
    return service.decode(String(token))
  } catch {
    return null
  }
}
