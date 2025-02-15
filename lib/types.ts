import { z } from "zod"

export const emailSchema = z.object({
  encodedEmail: z.string(),
  expireYear: z.number().int(),
})

export type Email = z.infer<typeof emailSchema>

export const simpleEmailSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
})

export type SimpleEmail = z.infer<typeof simpleEmailSchema>
