const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

//GET all products
const getProducts =  asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500)
        throw new Error({message: error.message})   
    }
})


//GET a product
const getProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500)
        throw new Error({message: error.message})
    }
})

//POST a product
const createProduct = asyncHandler(async(req, res) => {
    try{
        const products = await Product.create(req.body)
        res.status(200).json(products)

    }catch(error){
        res.status(500)
        throw new Error({message: error.message})
    }
})

//PUT a product
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(400)
            throw new Error({message: 'Product not found'}) 
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500)
        throw new Error({message: error.message}) 
    }
})

//DELETE product(s) 
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(400)
            throw new Error({message: 'Product not here'}) 
        } 
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500)
        throw new Error({message: error.message})
    }
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}