import Link from "next/link"
import { FC } from "react"

const Header: FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-2xl font-bold text-gray-800">
            {"École Achard"}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
