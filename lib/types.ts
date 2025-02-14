import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  expire_year: z.number().int(),
})

export type Email = z.infer<typeof emailSchema>
