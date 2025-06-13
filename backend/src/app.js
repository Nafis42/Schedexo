import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { startTokenRefreshJob } from './jobs/tokenRefresh.job.js'
import socialAuthRouter from './routes/socialAuth.routes.js'
import twitterRouter from './routes/twitter.routes.js'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))

// Routes
app.use("/api/social", socialAuthRouter)
// app.use("/api/twitter", twitterRouter)

// Start the token refresh job
startTokenRefreshJob()

export {app}
