require ('dotenv').config()
const port = process.env.PORT || 3000 
const Joi = require('joi')
const express = require('express')

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

const ifTooMuch = () => {
    if(!req.body.name || !req.body.department || req.body.name < 3)
    return res.status(400).send('Please enter a name/department/name left not less than 3')
}

app.listen(port, () => console.log(`Server listening on my preferred port ${port}`));