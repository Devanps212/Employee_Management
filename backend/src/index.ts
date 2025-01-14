import express, { Application } from 'express'
import cors from 'cors'
import {connectDB} from './config/db'
import errorHandling from './middlewares/errorHandling'
import config from './config'
import adminRouter from './routes/admin'
import employeeRouter from './routes/employee'
import departmentRouter from './routes/department'

const PORT = config.PORT || 5000
const app: Application = express()

const options = {
    origin: config.FRONTEND_URL,
    methods:["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: [
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
        "Access-Control-Allow-Origin",
    ],
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(options))
connectDB()

app.use('/api/', adminRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/department', departmentRouter)
app.use(errorHandling as any)


app.listen(PORT, ()=>{
    console.log(`server listening to PORT ${PORT}`)
})