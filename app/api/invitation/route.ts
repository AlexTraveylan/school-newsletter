import { createInvitationUrlKey } from "@/lib/invitation.service"
import { JWTAdminService } from "@/lib/jwt.service"
import { InvitationRepository } from "@/lib/repository"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")

    if (!token) {
      throw new Error("Non autorisé")
    }

    const jwtService = new JWTAdminService()
    const user = jwtService.decode(token.value)

    if (user.isSuperAdmin === false) {
      throw new Error("Droits insuffisants")
    }

    const newInvitation = createInvitationUrlKey()
    const invitationRepository = new InvitationRepository()

    await invitationRepository.add({ urlKey: newInvitation, isUsed: false })

    return NextResponse.json({
      message: "Invitation créée avec succès",
      urlKey: newInvitation,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "L'invitation n'a pas pu être crée" },
      { status: 400 }
    )
  }
}
