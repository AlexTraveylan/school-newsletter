import settings from "@/package.json"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 text-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left section */}
          <div className="text-center md:text-left">
            <p className="text-gray-800">
              © {new Date().getFullYear()} {"Représentants des parents d'élèves"}
            </p>
            <p className="text-gray-800 text-sm mt-1 text-center">
              {"École Achard - Version"} {settings.version}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {"Maternelle : 165 Rue Achard - 33300 Bordeaux"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {"Élémentaire: 12 cité Lartigue - 33300 Bordeaux"}
            </p>
          </div>

          {/* Middle section */}
          <div className="text-sm text-muted-foreground text-center">
            Aucun designer n&apos;a été blessé lors de la création de ce site.
          </div>

          {/* Right section */}
          <div className="flex flex-col gap-4">
            <a
              href="https://github.com/AlexTraveylan/school-newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-center md:text-right"
            >
              {"Code open source du site"}
            </a>
            <a
              href="https://www.alextraveylan.fr/fr/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-center md:text-right"
            >
              {"Contacter le développeur"}
            </a>
            <Link
              href="/policy"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-center md:text-right"
            >
              {"Politique de confidentialité"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
