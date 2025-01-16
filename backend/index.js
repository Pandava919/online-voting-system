const express = require('express')
const connectDB = require('./helpers/connectDB')
const users = require('./models/user.model')
const cors = require('cors')
let onlineVotingRoutes = require('./routes/onlinevoting.route')
require('dotenv').config()

let app = express()     //creating express application
app.use(express.json())     //to fetch req.body data
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
app.use(cors())     //alowing access to all the ports
app.use('/api/onlinevoting', onlineVotingRoutes)      //main route

app.use('*', (req, res, next) => {      //wild card route
    res.status(200).json("File not found")
})
app.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message })
})

startingServer()