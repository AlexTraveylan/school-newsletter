import bcrypt from "bcryptjs"

export class PasswordService {
  private static readonly SALT_ROUNDS = 12

  static async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS)
      const hash = await bcrypt.hash(password, salt)
      return hash
    } catch (error) {
      throw new Error("Erreur lors du hashage du mot de passe")
    }
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
      throw new Error("Erreur lors de la comparaison des mots de passe")
    }
  }
}
