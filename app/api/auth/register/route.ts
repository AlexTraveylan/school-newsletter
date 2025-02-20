import { JWTAdminService } from "@/lib/jwt.service"
import { PasswordService } from "@/lib/password.service"
import { AdminRepository, InvitationRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { Admin, registerSchema } from "@/lib/types"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password, code } = await request.json()
    const validData = registerSchema.parse({ username, password, code })

    const invitationRepository = new InvitationRepository()
    const invitations = await invitationRepository.getAll()

    const invitation = invitations.find((invitation) => {
      return invitation.urlKey === validData.code
    })

    if (!invitation) {
      return NextResponse.json({ error: "Code d'invitation invalide" }, { status: 401 })
    }

    const adminRepository = new AdminRepository()
    const securityService = new SecurityService()
    const allAdmins = await adminRepository.getAll()

    const isExistingUser = allAdmins.find((admin) => {
      return securityService.decode(admin.encodedUsername) === validData.username
    })

    if (isExistingUser) {
      return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 401 })
    }

    const preparedAdmin: Admin = {
      encodedUsername: securityService.encode(validData.username),
      hashedPassword: await PasswordService.hash(validData.password),
      isSuperAdmin: false,
    }

    const jwtService = new JWTAdminService()
    const token = jwtService.encode(preparedAdmin)

    await invitationRepository.update({ ...invitation, isUsed: true })
    await adminRepository.add(preparedAdmin)

    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({ message: "Inscription réussie" })
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
}
