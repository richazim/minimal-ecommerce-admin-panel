import { NextRequest } from "next/server"
import { withBasicAuth } from "./middleware/auth/withBasicAuth"

export async function middleware(req: NextRequest) {
  return await withBasicAuth(req)
}

export const config = {
  matcher: ["/admin/:path*"], // cible seulement /admin/*
}
