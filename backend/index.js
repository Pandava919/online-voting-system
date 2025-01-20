const express = require('express')
const connectDB = require('./helpers/connectDB')
const cors = require('cors')
let onlineVotingRoutes = require('./routes/onlinevoting.route');
let votingRoutes = require('./routes/voter.route')
require('dotenv').config()

let app = express()     //creating express application
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true
    }
))     //alowing access to all the ports

app.use(express.json({ limit: "10mb" }))     //to fetch req.body data
let startingServer = async () => {      //server starting
    try {
        await connectDB(process.env.MONGODB_URL)       //connecting to database
        console.log("database connected successfully");
        app.listen(process.env.PORT, () => {        //listening or starting server
            console.log("server is running");
        })
    } catch (error) {
        console.log(error);
    }
}
app.use('/api/onlinevoting', onlineVotingRoutes)      //main route
app.use('/api/onlinevoting', votingRoutes)      //voting route

app.use('*', (req, res, next) => {      //wild card route
    res.status(200).json("File not found")
})
app.use((err, req, res, next) => {      //error handling middleware or route
    res.status(500).json({ error: true, message: err.message })
})

startingServer()