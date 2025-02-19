"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SimpleEmail, simpleEmailSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const NewsletterForm = () => {
  const form = useForm<SimpleEmail>({
    resolver: zodResolver(simpleEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: SimpleEmail) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Erreur lors de l'inscription")

      toast.success("Vous êtes inscrit à la newsletter !")

      form.reset()
    } catch {
      toast.error("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {"Newsletter École Achard"}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {"Restez informé des actualités de l'école en vous inscrivant à notre newsletter"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="votre@email.fr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {"S'inscrire"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default NewsletterForm
