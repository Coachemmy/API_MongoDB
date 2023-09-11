require ('dotenv').config()
const port = process.env.PORT || 3000 
const express = require('express') 
const Product = require('./model/productModel')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

//these are the courses 
const courses = [
    {id: 1, name: 'course1', department: 'computer department'},
    {id: 2, name: 'course2', department: 'finance department'},
    {id: 3, name: 'course3', department: 'arts department'}
]

//get listening port on our browser
app.get('/', (req, res) =>{
    
    res.send('Hello World, thanks For Listening')
})

//get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//get any course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with that ID is not found')

    res.send(course)
})

//post any course
app.post('/api/courses', (req, res) => {

    ifTooMuch

    const course = {
        id: courses.length + 1,
        name: req.body.name,
        department: req.body.department
    }

    courses.push(course)
    res.send(course)
})

//put any course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('ID not found ')

    ifTooMuch

    course.name = req.body.name,
    course.department = req.body.department
    res.send(course)
})

//delete any course
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('This particular course is not available')
   
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})


////////////////////////////////////////////////////////////////////////////////////////
//GET all products
app.get('/product', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
})

//GET a single product
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
})

//POST products
app.post('/product', async(req, res) => {
    try{
        const products = await Product.create(req.body)
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//PUT a product
app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) return res.status(404).json({message: 'Product not found'})
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
})

//DELETE a product
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).json({message: 'Product not found'})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
})
///////////////////////////////////////////////////////////////////


const ifTooMuch = () => {
    if(!req.body.name || !req.body.department || req.body.name < 3)
    return res.status(400).send('Please enter a name/department/name left not less than 3')
}

mongoose.connect('INSERT YOUR MONGODB KEY HERE')
.then(()=> {
    console.log('connected to mongoDB')

    app.listen(port, () => console.log(`Server listening on my preferred port ${port}`));

}).catch((error) => {
    console.log(error)
})