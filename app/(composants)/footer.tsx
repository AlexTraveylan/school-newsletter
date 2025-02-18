import settings from "@/package.json"
import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="border-t py-4 px-4">
      <div className="container mx-auto text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()}{" "}
          {"Représentants des parents d'élèves - École Achard"}
        </p>
        <p>Version {settings.version}</p>
      </div>
    </footer>
  )
}

export default Footer
