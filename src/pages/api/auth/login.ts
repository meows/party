import { NextRequest, NextResponse } from "next/server"

export default function handler(req: NextRequest, res: NextResponse) {
   res.headers.set("Set-Cookie", "token=token")

   return {
      status: 200,
      headers: {
         location: "/",
      },
   }
}