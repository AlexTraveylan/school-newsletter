"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputEye } from "@/components/ui/input-password-eye"
import { Register, registerSchema } from "@/lib/types"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const urlParams = useSearchParams()
  const urlCode = urlParams.get("code")

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      code: urlCode || "",
    },
  })

  const onSubmit = async (values: Register) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Erreur lors de la connexion")

      toast.success("Connexion réussie !")
    } catch {
      toast.error("Erreur lors de la connexion")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rejoindre les administrateurs</CardTitle>
          <CardDescription>Reservé aux représentants des parents élus.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email ou nom d&apos;utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="votre@email.fr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <InputEye {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code d'invitation</FormLabel>
                      <FormControl>
                        <Input disabled={urlCode !== null} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm text-red-600/60">
          Vous vous engagez à ne pas diffuser les emails, et à les utilisez uniquement pour
          les communications des représentants des parents.
        </CardFooter>
      </Card>
    </div>
  )
}
