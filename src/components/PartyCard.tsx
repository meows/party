'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import { party } from '@prisma/client'
import Image from 'next/image';

type PartyCardProps = {
    party: party
}

const PartyCard: React.FC<PartyCardProps> = ({party}) => {
    return (
        <div className='party_card'>
            <div className='flex justify-between items-start gap-5'>
                <Image
                    src={party.banner_image ?? ""}
                    alt="party_banner"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />

            </div>
            <div className='flex flex-col'>
                {/* need to first fetch the account tables to get the host's name */}
                <h3>{party.host_id}</h3>
                <p>{party.party_name}</p>
            </div>
        </div>
    )
}

export default PartyCard