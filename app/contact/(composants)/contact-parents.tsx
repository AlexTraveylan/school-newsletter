import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ParentElu } from "@/lib/types"
import { Users } from "lucide-react"
import { ParentCard } from "./parent-card"

export const ParentsList = ({ parents }: { parents: ParentElu[] }) => {
  const titulaires = parents.filter((parent) => parent.isTitulaire)
  const suppleants = parents.filter((parent) => !parent.isTitulaire)

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-2xl text-center">Parents d'élèves</CardTitle>
        </div>
        <p className="text-center text-gray-500">
          Représentants pour l'année scolaire 2024-2025
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[480px] pr-4">
          <div className="space-y-6">
            {/* Section Titulaires */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Titulaires</h3>
                <Badge variant="secondary">{titulaires.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {titulaires.map((parent, index) => (
                  <ParentCard key={index} parent={parent} />
                ))}
              </div>
            </div>

            {/* Section Suppléants */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Suppléants</h3>
                <Badge variant="secondary">{suppleants.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suppleants.map((parent, index) => (
                  <ParentCard key={index} parent={parent} />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
