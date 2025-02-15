import { beforeEach, describe, expect, it } from "bun:test"
import { SecurityService } from "./security.service"

describe("SecurityService", () => {
  let securityService: SecurityService
  const mockIv = Buffer.from("1234567890123456")

  beforeEach(() => {
    // Réinitialiser l'instance pour chaque test
    securityService = new SecurityService()
  })

  describe("encode", () => {
    it("devrait correctement chiffrer un message", () => {
      // Créer un mock du module crypto
      const mockCrypto = {
        randomBytes: () => mockIv,
        createCipheriv: () => ({
          update: () => "encrypted-",
          final: () => "final",
        }),
      }

      // Injecter le mock dans l'instance
      // @ts-expect-error - On ignore l'erreur TS car on modifie une propriété privée pour les tests
      securityService.crypto = mockCrypto

      const message = "message secret"
      const result = securityService.encode(message)

      expect(result).toBe(`${mockIv.toString("base64")}:encrypted-final`)
    })
  })

  describe("decode", () => {
    it("devrait correctement déchiffrer un message encodé", () => {
      // Créer un mock pour le déchiffrement
      const mockCrypto = {
        createDecipheriv: () => ({
          update: () => "decrypted-",
          final: () => "final",
        }),
      }

      // Injecter le mock
      // @ts-expect-error - On ignore l'erreur TS car on modifie une propriété privée pour les tests
      securityService.crypto = mockCrypto

      const encodedMessage = `${mockIv.toString("base64")}:encrypted-message`
      const result = securityService.decode(encodedMessage)

      expect(result).toBe("decrypted-final")
    })

    it("devrait lever une erreur si le format du message encodé est invalide", () => {
      const invalidMessage = "invalid-format"
      expect(() => {
        securityService.decode(invalidMessage)
      }).toThrow()
    })
  })
})
