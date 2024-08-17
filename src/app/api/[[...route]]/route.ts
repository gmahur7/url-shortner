import dbConnect from '@/database/dbConnect'
import Url from '@/Models/UrlModel'
import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import { nanoid } from 'nanoid'

// export const runtime = 'edge'
dbConnect()

const domain = process.env.DOMAIN_URL || "http://localhost:3000"


const app = new Hono()

app.use('*', cors({
    origin:'http://localhost:3000',
    // origin: 'https://url-shorten-hono.vercel.app', // Allow only your frontend's origin
    allowMethods: ['GET', 'POST'], // Allow specific HTTP methods
  }))

app.post('/api/url', async (c: Context) => {
    const { url } = await c.req.json();
    if (!url) {
        return c.json({
            success: false,
            error: "Url not found!"
        })
    }
    try {
        let newData = new Url({
            url,
            shortId: nanoid(8),
            visits: []
        })
        newData = await newData.save();

        if (!newData) {
            return c.json({
                success: false,
                error: "Unable to short the provided url"
            })
        }

        return c.json({
            success: true,
            data: newData
        })

    } catch (error: any) {
        return c.json({
            success: false,
            error: error.message
        })
    }
})

app.get('/api/:id', async (c: Context) => {
    const id = c.req.param('id')
    const result = await Url.findOne({ shortId: id })
    if (!result) {
        return c.text("Invalid URL!")
    }

    const visit = {
        time: Date.now()
    };
    result.visits.push(visit);

    await result.save();

    return c.redirect(result.url)
})

app.post('/api/url/get', async (c: Context) => {
    const {url} = await c.req.json()
    const shortId = url.slice(domain.length+5)
    // console.log(shortId)
    try {
        const result = await Url.findOne({ shortId: shortId }).sort();
        // console.log(result)
        if (!result) {
            return c.json({
                success:false,
                error:"Invalid URL!"
            })
        }
    
        return c.json({
            success:true,
            data:result
        })
        
    } catch (error) {
        return c.json({
            success:false,
            error:"Error in getting analytics"
        })
    }
   

})

export const GET = handle(app)
export const POST = handle(app)
