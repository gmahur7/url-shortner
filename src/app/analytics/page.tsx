'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

interface IDetails {
    url: string;
    visits: []
    shortId: string
    createdAt: Date
    updatedAt: Date
}

const Page = () => {
    
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState<string>('')
    const [details, setDetails] = useState<null | IDetails>(null)

    const getDetails = async () => {
        setLoading(true)
        if (!url) {
            toast.error("Please Enter URL First!")
            setLoading(false)
            return
        }
        try {
            const res = await axios.post(`api/url/get`, { url })
            if (res.data.success) {
                setDetails(res.data.data)
            }
            else {
                toast.error(res.data.error)
                setDetails(null)
            }
        } catch (error) {
            setDetails(null)
            console.error("Error in generating short url: ", error)
            toast.error("Error in generating short url!")
        }
        setLoading(false)
    }

    const formatedate = (timestamp: any) => {
        const date = new Date(timestamp);
        const humanReadable = date.toLocaleString();
        return humanReadable;
    }

    return (
        <>
        <div className='flex justify-center flex-col mt-20'>
            {/* <div className="w-3/4"> */}
            <div className='text-center py-5'>
                <p className='text-lg'>Enter your generated short URL to check analytics.</p>
            </div>
            <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
                <input className="w-5/6 md:w-2/5 px-5 py-2 bg-rose-300 border-rose-400 border-2 hover:bg-rose-400 rounded-md text-black placeholder:text-red-700 placeholder:text-bold"
                    type="text" placeholder="Enter Short Url....."
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <button className="px-5 py-2 bg-rose-300 border-rose-400 border-2 hover:bg-rose-400 rounded-md text-red-700"
                    onClick={getDetails}
                >Get</button>
            </div>
            {/* </div> */}
            {details !== null &&
                <div className='px-2'>
                    <div className='flex justify-center items-center gap-12 mt-8 flex-wrap'>
                        <div className='bg-rose-900 p-8 text-center rounded-md'>
                            <h3 className='mb-2 text-rose-200'>Last Visit</h3>
                            <h2 className='text-xl'>{formatedate(details?.updatedAt)}</h2>
                        </div>
                        <div className='bg-rose-900 p-8 text-center rounded-md'>
                            <h3 className='mb-2 text-rose-200'>Total Visit</h3>
                            <h2 className='text-2xl'>{details.visits.length}</h2>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-12 mt-8'>
                        <div className='bg-rose-900 p-8 text-center rounded-md'>
                            <h3 className='mb-2 text-rose-200'>Redirect Url</h3>
                            <h2 className='text-xl'>{details.url}</h2>
                        </div>
                    </div>
                </div>
            }
            {
                loading && <div className='text-center py-4'>Loading...</div>
            }
        </div>
        <ToastContainer/>
        </>
    )
}

export default Page