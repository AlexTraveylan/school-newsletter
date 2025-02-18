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
  username: z.string(),
  password: z.string(),
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
