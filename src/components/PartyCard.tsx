"use client"

import React from "react"
import { party } from "@prisma/client"

type PartyCardProps = {
   party: party
}

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
   return (
      <div className="party_card">
         <div className="flex items-start justify-between gap-5">
            <img
               src={`data:image/png;base64,${party.banner?.toString()}`}
               alt="party_banner"
               width={40}
               height={40}
               className="rounded-full object-contain"
            />
         </div>
         <div className="flex flex-col">
            <h3>{party.host}</h3>
            <p>{party.party_name}</p>
         </div>
      </div>
   )
}

export default PartyCard
