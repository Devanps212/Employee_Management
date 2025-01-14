import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRETKEY,
    FRONTEND_URL:process.env.FRONTEND_URL
}

export default config