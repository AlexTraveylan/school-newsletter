import { ParentEluRepository } from "@/lib/repository"
import { ParentsList } from "./(components)/contact-parents"

export default async function ContactPage() {
  const parentsRepository = new ParentEluRepository()
  const parentsElus = await parentsRepository.getAll()

  return <ParentsList parents={parentsElus} />
}
