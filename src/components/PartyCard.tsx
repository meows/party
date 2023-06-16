'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import { parties } from '@prisma/client'

type PartyCardProps = {
    party: parties
}

const PartyCard: React.FC<PartyCardProps> = ({party}) => {
    return (
        <div className='party_card'>
            <div className='flex justify-between items-start gap-5'>
                <img
                    src={`data:image/png;base64,${party.bannerimage.toString('base64')}`}
                    alt="party_banner"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />

            </div>
            <div className='flex flex-col'>
                <h3>{party.host}</h3>
                <p>{party.name}</p>
            </div>
        </div>
    )
}

export default PartyCard