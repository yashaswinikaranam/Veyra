import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import {v2 as cloudinary } from 'cloudinary'

//APP CONFIG
const app=express()
const port=process.env.port || 4000
connectDB()
connectCloudinary()



// app middlewares
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

//api endpoints
app.get('/',(req,res)=> {
    res.send('API WORKING')
})

app.listen(port, ()=> {
    console.log('SERVER STARTED ON 4000!')
})
