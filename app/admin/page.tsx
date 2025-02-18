import { isExpired } from "@/lib/date.service"
import { EmailRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import ListEmails from "./(composants)/list-emails"

export default async function AdminPage() {
  const emailRepository = new EmailRepository()
  const emails = await emailRepository.getAll()
  const securityService = new SecurityService()

  const filteredDecodedEmails = emails
    .filter((email) => isExpired(email.expireYear) === false)
    .map((email) => securityService.decode(email.encodedEmail))

  return <ListEmails emails={filteredDecodedEmails} />
}
