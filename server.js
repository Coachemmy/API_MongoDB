require ('dotenv').config()
const express = require('express') 
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')
const app = express()

//env variables
const MongoURL = process.env.MONGO_URL 
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND_URL

//a specific frontend
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200
}

//middleware for json
app.use(express.json())

//middleware for cors
app.use(cors(corsOptions))

//errorMiddleware
app.use(errorMiddleware)

//route
app.use('/api/product', productRoute)

//////////////////////////////
app.get('/', (req, res) => {
    res.json('HELLO')
})
//////////////////////////////
mongoose.connect(MongoURL)
.then(()=> {
    console.log('connected to mongoDB')

    app.listen(PORT, () => console.log(`Server listening on my preferred port ${PORT}`));

}).catch((error) => {
    console.log(error)
})