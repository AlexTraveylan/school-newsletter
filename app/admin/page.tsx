import { isExpired } from "@/lib/date.service"
import { verifyAuth } from "@/lib/jwt.service"
import { EmailRepository, InvitationRepository } from "@/lib/repository"
import { SecurityService } from "@/lib/security.service"
import { redirect } from "next/navigation"
import ListEmails from "./(components)/list-emails"
import InvitationsList from "./(components)/list-invitations"

export default async function AdminPage() {
  const auth = await verifyAuth()

  if (!auth) {
    redirect("/auth/login")
  }

  const emailRepository = new EmailRepository()
  const emails = await emailRepository.getAll()
  const securityService = new SecurityService()

  const invitationRepository = new InvitationRepository()
  const invitations = await invitationRepository.getAll()

  const filteredDecodedEmails = emails
    .filter((email) => isExpired(email.expireYear) === false)
    .map((email) => securityService.decode(email.encodedEmail))

  return (
    <div className="flex flex-col gap-2">
      <section className="text-sm text-muted-foreground">
        <p>Connecté en tant que {auth.username}</p>
        <p>Rôle : {auth.isSuperAdmin ? "Super Admin" : "Admin"}</p>
      </section>

      <h3 className="text-red-400">
        L&apos;usage de ces adresses email est strictement réservé aux communications des
        représentants des parents.
      </h3>

      <ListEmails emails={filteredDecodedEmails} />

      {auth.isSuperAdmin && <InvitationsList invitations={invitations} />}
    </div>
  )
}
