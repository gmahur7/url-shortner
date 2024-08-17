'use client'
import 'dotenv/config'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
const domain = process.env.NEXT_PUBLIC_DOMAIN_URL

export default function Home() {
  // const domain = process.env.DOMAIN_URL
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string>('')
  const [shortUrl, setShortUrl] = useState<string>('')

  const generate = async () => {
    setLoading(true)
    if (!url) {
      toast.error("Please Enter URL First!")
      setLoading(false)
      return 
    }
    try {
      const res = await axios.post(`api/url`, { url })
      if (res.data.success) {
        setShortUrl(res.data.data.shortId)
      }
      else {
        setShortUrl('')
      }
    } catch (error) {
      console.error("Error in generating short url: ", error)
      toast.error("Error in generating short url!")
    }
    setLoading(false)
  }

  const navigate = async () => {
    window.location.href = `${domain}/api/${shortUrl}`;
  }

  return (
    <>
      <main className="h-screen flex justify-center items-center flex-col ">
        <h1 className="text-bold text-4xl md:text-8xl mb-12 text-rose-300">Short Your Url !</h1>
        <h2 className="text-bold text-lg md:text-xl mb-4 border-b-2">Enter url and click generate to short your url.</h2>
        <div className="w-3/4">
          <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
            <input className="w-5/6 md:w-2/5 px-5 py-2 bg-rose-300 border-rose-400 border-2 hover:bg-rose-400 rounded-md text-black placeholder:text-red-700 placeholder:text-bold"
              type="text" placeholder="Enter Url....."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <button className="px-5 py-2 bg-rose-300 border-rose-400 border-2 hover:bg-rose-400 rounded-md text-red-700"
              onClick={generate}
            >Generate</button>
          </div>
        </div>
        {shortUrl && !loading &&
          <div className="mt-8 text-center">
            <p>Click to go to your original url {"->"} <span onClick={navigate} className="underline italic cursor-pointer">{domain}/api/{shortUrl}</span></p>
          </div>}
        {
          loading &&
          <p>Loading...</p>
        }
      </main>
      <ToastContainer />
    </>
  );
}
