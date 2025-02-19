import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Policy = {
  title: string
  content: string
}
const policies: Policy[] = [
  {
    title: "Collecte des données",
    content:
      "Nous collectons uniquement votre adresse e-mail lorsque vous vous inscrivez à notre newsletter. Il est ensuite encodé dans notre base de données pour des raisons de sécurité et conservé jusqu'à la fin de l'année scolaire en cours. Il est ensuite supprimé.",
  },
  {
    title: "Utilisation des données",
    content:
      "Votre adresse e-mail est utilisée exclusivement pour vous envoyer des informations relatives à l'école et aux activités des représentants des parents d'élèves.",
  },
  {
    title: "Protection des données",
    content:
      "Nous nous engageons à protéger vos données personnelles et à ne pas les partager avec des tiers.",
  },
  {
    title: "Vos droits",
    content:
      "Vous pouvez à tout moment vous désinscrire de la newsletter et demander la suppression de vos données en nous contactant.",
  },
]

export default function PolicyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {"Politique de confidentialité"}
          </CardTitle>
          <CardDescription>
            {
              "Cette politique de confidentialité explique comment nous collectons et utilisons vos données personnelles dans le cadre de notre newsletter."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <div key={index} className="space-y-2">
                {index > 0 && <Separator className="my-4" />}
                <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                <p className="text-gray-600 leading-relaxed">{policy.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
