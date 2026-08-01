import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

//APP CONFIG
const app=express()
const port=process.env.port || 4000
connectDB()
connectCloudinary()


// app middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res)=> {
    res.send('API WORKING')
})

app.listen(port, ()=> {
    console.log('SERVER STARTED ON 4000!')
})
