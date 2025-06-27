import { NextRequest, NextResponse } from "next/server"
import { unauthorizedResponse } from "../response/unauthorizedResponse"
import { isValidPassword } from "../utils/isValidPassword"

export async function withBasicAuth(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse()
  }

  const [username, password] = atob(authHeader.split(" ")[1]).split(":")
  const isValid =
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD!))

  return isValid ? NextResponse.next() : unauthorizedResponse()
}


