import { NextResponse } from "next/server"

export function unauthorizedResponse(): NextResponse {
    
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    })
  }