import React from "react"
import { api } from "~/utils/api"
import PartyCard from "@/PartyCard"

export default function Feed() {
  const { data } = api.example.getAll.useQuery()

  return (
    <div>
      <section className="feed">
        <div className="prompt_layout mt-5">
          {data?.map((p, i) => <PartyCard party={p} key={i} /> )}
        </div>
      </section>
    </div>
  )
}
