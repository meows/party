import { NextRequest, NextResponse } from "next/server"

export default function handler(req: NextRequest, res: NextResponse) {
   if (req.method !== "POST") 
   
   res.cookies.set("token", "token")
   res.cookies.set("account", "1")
   return {
      status: 200,
      body: {
         message: "success",
      },
   }
}