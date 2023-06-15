'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import PartyCard from './PartyCard';
import { parties } from '@prisma/client'

type FeedProps = {

}

const Feed: React.FC<FeedProps> = ({ }) => {
    const [parties_list, setParties] = useState([]);

    useEffect(() => {
        const fetchParties = async () => {
            const response = await fetch('api/parties');
            const data = await response.json();
            setParties(data);
        }
        fetchParties();
    }, []);

    return (
        <div>
        <section className='feed'>
            <div className='mt-5 prompt_layout'>
                {parties_list.map((party: parties) => (
                    <PartyCard
                        party={party}
                    />
                ))}
            </div>
        </section>
        </div>
    )
}

export default Feed