import { getExpiredYear } from "@/lib/date.service"
import { EmailRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { simpleEmailSchema } from "@/lib/types"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string
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

    return NextResponse.json({ message: "Email ajouté avec succès" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Echec lors de l'ajout de l'email" },
      { status: 400 }
    )
  }
}

export async function GET() {
  const emailRepository = new EmailRepository()
  const securityService = new SecurityService()

  const emails = await emailRepository.getAll()

  const formatedEmails = emails.map((email) => {
    return {
      email: securityService.decode(email.encodedEmail),
    }
  })

  return NextResponse.json({ formatedEmails })
}
