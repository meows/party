"use client"

import React from "react"
import { party } from "@prisma/client"

type Props = {
   party: party
}

export default function PartyCard({ party }: Props) {
   return (
      <div className="party_card mb-5">
         <div className="flex items-start justify-between gap-5">
            {/* <img
               src={`data:image/png;base64,${party.banner?.toString()}`}
               alt="party_banner"
               width={40}
               height={40}
               className="rounded-full object-contain"
            /> */}
         </div>
         <div className="flex flex-col">
            <h3 className="text-slate-200">Host: {party.host}</h3>
            <p className="text-slate-200">Name: {party.party_name}</p>
         </div>
      </div>
   )
}