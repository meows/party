import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import TopMenu from '~/components/TopMenu'
import { Button } from '@/components/ui/button'

const CreateEventPage = () => {
    const [inputPartyName, setInputPartyName] = useState<string>('www.xyzparty.com/party/')
    const router = useRouter()

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
                <Button>
                    Submit
                </Button>

            </div>
        </div>
    )
}

export default CreateEventPage