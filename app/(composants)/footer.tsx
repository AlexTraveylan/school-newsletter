import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="text-center px-4 py-8">
        © {new Date().getFullYear()} {"Association des Parents d'Élèves - École Achard"}
      </div>
    </footer>
  )
}

export default Footer
