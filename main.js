import express from "express"
import bodyparser from "body-parser"
import path from "path"
import helmet from "helmet"
import cors from "cors"
import history from "connect-history-api-fallback"
import api from "./api"
const morgan = require("morgan")
const app = express()

// setup morgan with express
app.use(morgan("tiny"))

// use cors with express
app.use(cors())

// use bodyparser with express
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// use helmet with express
app.use(helmet())
app.use(express.static(path.join(__dirname, "uploads")))

// serve api
app.use("/api", api)

// serve vue build files with history routing
// app.use(express.static(path.join(__dirname, "dist")))
// app.use(history())
// app.use(express.static(path.join(__dirname, "dist")))
app.get("/", (req, res) => {
    // res.status(200).sendFile("/index.html")
    res.status(200).json({ status: "API Working Perfectly." })
})

// port number on which express will start
const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log("Server started on port", PORT)
})
