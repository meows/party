import React from "react";
import { useState, useEffect } from "react";
import { party } from "@prisma/client";

import PartyCard from "./PartyCard";
import { api } from "~/utils/api";

type FeedProps = {};

const Feed: React.FC<FeedProps> = ({}) => {
  const [ parties_list, setParties ] = useState<party[]>([]);
  const { client } = api.useContext();

  useEffect(() => {
    const fetchParties = async () => {
      const response = await client.example.getAll.query();

      setParties(response || []);
    };
    fetchParties();
  }, []);

  return (
    <div>
      <section className="feed">
        <div className="prompt_layout mt-5">
          { parties_list.map(party => <PartyCard party={party} /> )}
        </div>
      </section>
    </div>
  );
};

export default Feed;
