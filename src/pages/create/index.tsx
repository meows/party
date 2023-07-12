import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { api } from "~/utils/api"
import { Input } from "shadcn/components/ui/Input"
import { Button } from "shadcn/components/ui/Button"
import { URL_PARTY } from "~/constants"

interface FormData {
   name: string
   banner: string
   host: number
   time_start: string
   time_end?: string
   is_waitlist: boolean
   widgets?: string
   state: string
   city: string
   zip: string
   street: string
   unit?: string
   longitude: number
   latitude: number
}

const CreateEventPage = () => {
   const router = useRouter()
   const [hostName, setHostName] = useState<string>()
   const [formData, setFormData] = useState<FormData>({
      name: "",
      host: 0,
      banner: "",
      time_start: "",
      time_end: "",
      is_waitlist: false,
      widgets: "",
      state: "",
      city: "",
      zip: "",
      street: "",
      unit: "",
      longitude: 0,
      latitude: 0,
   })
   const query = api.party.makeParty.useMutation()

   function getHostName(): string | number | readonly string[] | undefined {
      // TODO: If signed in, do not allow user to change this field,
      //       and return their host name.
      return ""
   }

   function isLoggedIn(): boolean | undefined {
      // TODO: return if logged in.
      return false
   }

   return (
      // TODO: Add the navbar somehow.
      <div className="container mx-auto flex h-full items-center">
         <div className="relative h-fit w-full space-y-4 rounded-lg bg-white p-4">
            <div className="flex items-center justify-between">
               <h1 className="fond-semibold text-xl">Create a Party Page</h1>
            </div>
            <hr className="h-px bg-zinc-500" />
            <div>
               <p className="text-lg font-medium">Name</p>
               <p className="pb-2 text-xs">
                  Party Names cannot be changed later.
               </p>
            </div>
            <div className="relative">
               <Input
                  className="p1-6" //onClick={() => router.back()}
                  value={URL_PARTY + formData.name}
                  onChange={(e) =>
                     setFormData((prev) => ({
                        ...prev,
                        name: e.target.value.replace(URL_PARTY, ""),
                     }))
                  }
               />
            </div>

            <div className="relative">
               <p className="absolute left-0 text-small font-medium grid place-items-center text-zinc-400">
                Hosted by
                </p>
               <Input
                  value={getHostName() ?? hostName}
                  placeholder="Your Hosting Name"
                  disabled={isLoggedIn()}
                  onChange={(e) => {
                     setHostName(e.target.value)
                  }}
               />
            </div>
            <div className="flex justify-end gap-4">
               <Button
                  disabled={formData.name.length == 0}
                  onClick={() => {
                     // TODO: if signed out send the hostName value
                     //       to the backend, and use it once user
                     //       verifies their email aka creates an account.
                     query.mutate(formData)
                  }}
               >
                  {query.isLoading ? "Submitting..." : "Publish"}
               </Button>
            </div>
         </div>
      </div>
   )
}

export default CreateEventPage
