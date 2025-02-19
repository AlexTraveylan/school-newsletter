import { isExpired } from "@/lib/date.service"
import { verifyAuth } from "@/lib/jwt.service"
import { EmailRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { redirect } from "next/navigation"
import ListEmails from "./(components)/list-emails"

export default async function AdminPage() {
  const auth = await verifyAuth()

  if (!auth) {
    redirect("/auth/login")
  }

  const emailRepository = new EmailRepository()
  const emails = await emailRepository.getAll()
  const securityService = new SecurityService()

  const filteredDecodedEmails = emails
    .filter((email) => isExpired(email.expireYear) === false)
    .map((email) => securityService.decode(email.encodedEmail))

  return <ListEmails emails={filteredDecodedEmails} />
}
