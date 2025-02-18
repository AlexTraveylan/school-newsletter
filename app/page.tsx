import Link from "next/link"
import NewsletterForm from "./(composants)/newsletter-form"

export default function Home() {
  return (
    <>
      <NewsletterForm />
      <div className="flex justify-center pt-8 text-muted-foreground hover:text-primary transition-colors">
        <Link href="/contact">{"Voir la liste des parents Élus"}</Link>
      </div>
    </>
  )
}
