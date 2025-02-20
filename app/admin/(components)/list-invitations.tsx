"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Invitation } from "@/lib/types"
import { Check, Copy, Cross } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function InvitationsList({ invitations }: { invitations: Invitation[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null)

  const copyToClipboard = async (code: string, index: number) => {
    const invitationLink = `${window.location.origin}/auth/register?code=${code}`
    await navigator.clipboard.writeText(invitationLink)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const onCreateInvitation = async () => {
    const response = await fetch("/api/invitation", {
      method: "GET",
    })

    if (!response.ok) {
      toast.error("Erreur lors de la création de l'invitation")
    }

    toast.success(
      "Invitation créée avec succès : Ctrl + F5 pour refresh la page et la voir apparaître"
    )
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">{"Liste des invitations"}</CardTitle>
          <Button
            onClick={onCreateInvitation}
            variant="outline"
            className="flex items-center gap-2"
          >
            Créer une nouvelle invitation
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invitations.map((invitation, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
              >
                <span className="font-mono">{invitation.urlKey}</span>
                <div className="flex items-center gap-4">
                  {invitation.isUsed ? (
                    <Cross className="h-4 w-4 text-red-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(invitation.urlKey, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
