import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { api } from "~/utils/api";
import { Input } from 'shadcn/components/ui/input';
import { Button } from 'shadcn/components/ui/button';

interface FormData {
    name: string;
    banner: string;
    host: number;
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
}

const CreateEventPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        host: 0,
        banner: "",
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
      });
    const query = api.party.makeParty.useMutation()

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
                        placeholder='www.xyzparty.com/party/'
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({
                            ...prev,
                            [formData.name]: e.target.value,
                        }))}
                    />
                </div>
            </div>
            <div className='flex justify-end gap-4'>
                <Button
                    disabled={formData.name.length == 0}
                    onClick={() => query.mutate(formData)}>
                    {query.isLoading ? 'Submitting Party...' : 'Publish Party'}
                </Button>
            </div>
        </div>
    )
}

export default CreateEventPage