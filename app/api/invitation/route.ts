import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")
    if (!token) {
      throw new Error("Token manquant")
    }

    return NextResponse.json({ message: "Email ajouté avec succès" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Echec lors de l'ajout de l'email" },
      { status: 400 }
    )
  }
}
