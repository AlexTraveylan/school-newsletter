import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ParentElu } from "@/lib/types"
import { Mail } from "lucide-react"

export const ParentCard = ({ parent }: { parent: ParentElu }) => (
  <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
    <span>{parent.name}</span>
    {parent.email && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              href={`mailto:${parent.email}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{"Envoyer un email"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
)
