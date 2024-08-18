const express =require("express")
const app = express()
const bodyParser = require("body-parser")
const NodeCache=require("node-cache")
app.use(express.json())
app.use(bodyParser.json())
require("dotenv").config()
const axios =require("axios")



const cache = new NodeCache({stdTTL:3600})


app.get("/",(req,res)=>{
    res.json({message:"hello"})
})
 
app.get("/holidays",async(req,res)=>{
    const cacheKey = 'holidays_2019_US'
    let holidays= cache.get(cacheKey)
    if (holidays) {
        console.log("comes from cache")
        return res.status(200).json({holidays:holidays})
    }
    try {
        const  response = await axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDRIFY_API_KEY}&country=US&year=2019`)
         holidays =  response.data
         cache.set(cacheKey,holidays)
        res.status(200).json({holidays:holidays})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




app.listen(3000,()=>{
    console.log("server started on port 3000")
})



/*

It is a small task thats i did,t make any folder structure

*/

