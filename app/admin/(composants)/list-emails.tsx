"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function ListEmails({ emails }: { emails: string[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null)

  const copyToClipboard = async (email: string, index: number) => {
    await navigator.clipboard.writeText(email)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAllEmails = async () => {
    const allEmails = emails.map((email) => email).join("; ")
    await navigator.clipboard.writeText(allEmails)
    setCopiedIndex("all")
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">{"Liste des emails"}</CardTitle>
          <Button
            onClick={copyAllEmails}
            variant="outline"
            className="flex items-center gap-2"
          >
            {copiedIndex === "all" ? (
              <>
                <Check className="h-4 w-4" />
                {"Copié !"}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                {"Tout copier"}
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
              >
                <span className="font-mono">{email}</span>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(email, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
