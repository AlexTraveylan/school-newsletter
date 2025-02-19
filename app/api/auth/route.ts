import { JWTAdminService } from "@/lib/jwt.service"
import { PasswordService } from "@/lib/password.service"
import { AdminRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { loginSchema } from "@/lib/types"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const secureInput = loginSchema.parse({ username, password })

    const adminRepository = new AdminRepository()
    const allAdmins = await adminRepository.getAll()

    const securityService = new SecurityService()

    const user = allAdmins.find((admin) => {
      return securityService.decode(admin.encodedUsername) === secureInput.username
    })

    if (!user) {
      throw new Error("Utilisateur non trouvé")
    }

    const isValidPassword = await PasswordService.compare(
      secureInput.password,
      user.hashedPassword
    )

    if (!isValidPassword) {
      throw new Error("Mot de passe incorrect")
    }

    const jwtService = new JWTAdminService()
    const token = jwtService.encode(user)

    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({ message: "Connecté avec succès" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
}
