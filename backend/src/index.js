console.log("hello")
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config()

// Initialize database connection
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed",err);
})
