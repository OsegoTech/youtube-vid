import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import connectDb from "./utils/dbConnect.js"
import postRoutes from "./routes/postRoutes.js"



dotenv.config()
const port  = process.env.PORT
const app  = express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: "*"
}))

connectDb()

app.get("/", (req, res) => {
    console.log("This is the message from the server");
    res.send("Hello from the server end")
})

app.use("/api/v1/posts", postRoutes)



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})