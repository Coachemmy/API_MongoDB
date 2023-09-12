require ('dotenv').config()
const express = require('express') 
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const productRoute = require('./routes/productRoute')

//env variables
const MongoURL = process.env.MONGO_URL
const PORT = process.env.PORT

//route
app.use('/api/product', productRoute)

mongoose.connect(MongoURL)
.then(()=> {
    console.log('connected to mongoDB')

    app.listen(PORT, () => console.log(`Server listening on my preferred port ${PORT}`));

}).catch((error) => {
    console.log(error)
})