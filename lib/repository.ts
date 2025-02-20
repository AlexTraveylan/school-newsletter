import { get } from "@vercel/edge-config"
import { z } from "zod"
import { settings, vercelApiUrl } from "./settings"
import {
  Admin,
  adminSchema,
  Email,
  emailSchema,
  Invitation,
  invitationSchema,
  ParentElu,
  parentEluSchema,
} from "./types"

export class Repository<T> {
  protected readonly key: string
  private readonly schema: z.ZodType<T>

  constructor(schema: z.ZodType<T>, key: string) {
    this.key = key
    this.schema = schema
  }

  async getAll(): Promise<T[]> {
    const items = await get(this.key)
    if (items === undefined || items === null || Array.isArray(items) === false) {
      throw new Error(`Aucun item trouvé pour la clé ${this.key}`)
    }

    try {
      return items.map((item) => this.schema.parse(item))
    } catch (error) {
      console.error(error)
      throw new Error("Erreur lors de la récupération des items")
    }
  }

  async add(item: T): Promise<void> {
    const prevItems = await this.getAll()

    const newItems = [...prevItems, item]

    const response = await fetch(vercelApiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.vercel_api_token}`,
      },
      body: JSON.stringify({
        items: [
          {
            operation: "update",
            key: this.key,
            value: newItems,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'item")
    }
    console.log("Item ajouté avec succès")
  }
}

export class EmailRepository extends Repository<Email> {
  constructor() {
    super(emailSchema, "emails")
  }
}

export class AdminRepository extends Repository<Admin> {
  constructor() {
    super(adminSchema, "admins")
  }
}

export class InvitationRepository extends Repository<Invitation> {
  constructor() {
    super(invitationSchema, "invitations")
  }

  async update(invitation: Invitation): Promise<void> {
    const invitations = await this.getAll()
    const index = invitations.findIndex((i) => i.urlKey === invitation.urlKey)

    if (index === -1) {
      throw new Error("Invitation non trouvée")
    }

    invitations[index] = invitation

    const response = await fetch(vercelApiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.vercel_api_token}`,
      },
      body: JSON.stringify({
        items: [
          {
            operation: "update",
            key: this.key,
            value: invitations,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'invitation")
    }

    console.log("Invitation mise à jour avec succès")
  }
}

export class ParentEluRepository extends Repository<ParentElu> {
  constructor() {
    super(parentEluSchema, "parentsElus")
  }
}
