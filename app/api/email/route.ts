import { getExpiredYear } from "@/lib/date.service"
import { EmailRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { simpleEmailSchema } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const secureEmail = simpleEmailSchema.parse({ email })

    const securityService = new SecurityService()
    const emailRepository = new EmailRepository()

    const existedEmails = await emailRepository.getAll()
    const isEmailExisted = existedEmails.some((email) => {
      return securityService.decode(email.encodedEmail) === secureEmail.email
    })

    if (isEmailExisted === true) {
      throw new Error("L'email existe déjà")
    }

    const emailItem = {
      encodedEmail: securityService.encode(secureEmail.email),
      expireYear: getExpiredYear(),
    }

    emailRepository.add(emailItem)

    return NextResponse.json({ message: "Email ajouté avec succès" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Echec lors de l'ajout de l'email" },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    const emailRepository = new EmailRepository()
    const securityService = new SecurityService()

    const emails = await emailRepository.getAll()

    const formatedEmails = emails.map((email) => {
      return {
        email: securityService.decode(email.encodedEmail),
      }
    })

    return NextResponse.json({ formatedEmails })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Echec lors de la récupération des emails" },
      { status: 400 }
    )
  }
}
