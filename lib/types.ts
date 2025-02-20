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

export const adminSchema = z.object({
  encodedUsername: z.string(),
  hashedPassword: z.string(),
  isSuperAdmin: z.boolean(),
})

export type Admin = z.infer<typeof adminSchema>

export const invitationSchema = z.object({
  urlKey: z.string(),
  isUsed: z.boolean(),
})

export type Invitation = z.infer<typeof invitationSchema>

export const tokenPayloadSchema = z.object({
  username: z.string(),
  isSuperAdmin: z.boolean(),
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

export const parentEluSchema = z.object({
  name: z.string(),
  isTitulaire: z.boolean(),
  email: z.string().optional(),
})

export type ParentElu = z.infer<typeof parentEluSchema>

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type Login = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  username: z.string(),
  code: z.string(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit faire au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
})

export type Register = z.infer<typeof registerSchema>
