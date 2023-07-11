import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { api } from "~/utils/api";
import { Button } from '@/components/ui/button'

interface FormData {
    party_name: string;
    host_id: number;
    banner_image: File | null;
    time_start: string;
    time_end?: string;
    is_waitlist: boolean;
    widgets?: string;
    state: string;
    city: string;
    zip: string;
    street: string;
    unit?: string;
    longitude: number;
    latitude: number;
    plus_code?: string;
  }

const CreateEventPage = () => {
    const [inputPartyName, setInputPartyName] = useState<string>('www.xyzparty.com/party/')
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        party_name: '',
        host_id: 0,
        banner_image: null,
        time_start: '',
        time_end: '',
        is_waitlist: false,
        widgets: '',
        state: '',
        city: '',
        zip: '',
        street: '',
        unit: '',
        longitude: 0,
        latitude: 0,
        plus_code: '',
      });

    // const makePartyQuery = api.party.makeParty.useQuery({ formData });

    // Destructure mutate from useMutation and call it createAParty
    const { mutate: createAParty, isLoading } = useMutation({
        // mutationFn is any function that handles our data fetching logic.
        // This could be just a fetch request.
        mutationFn: async () => {
            // Is user logged out? If so, redirect to log in?
            

            // const data = api.party.makeParty.useQuery({ formData })
            const response = await fetch('api/routers/party/makeParty', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json()
            } else {
                // Handle error response
            }
            // return data as string
        },
    })

    return (
        // TODO: Add the navbar somehow.
        <div className="container flex items-center h-full mx-auto">
            <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl fond-semibold'>Create a Party Page</h1>
                </div>
                <hr className='bg-zinc-500 h-px' />
                <div>
                    <p className='text-lg font-medium'>Name</p>
                    <p className='text-xs pb-2'>
                        Party Names cannot be changed later.
                    </p>
                </div>
                <div className='relative'>
                    <Input 
                        className='p1-6' //onClick={() => router.back()}
                        value={inputPartyName}
                        onChange={(e) => setInputPartyName(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex justify-end gap-4'>
                <Button
                    disabled={inputPartyName.length == 0}
                    onClick={() => createAParty()}>
                    {isLoading ? 'Submitting Party...' : 'Publish Party'}
                </Button>

            </div>
        </div>
    )
}

export default CreateEventPage