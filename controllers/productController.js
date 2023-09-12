const Product = require('../models/productModel')

//GET all products
const getProducts =  async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
}


//GET a product
const getProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
}

//POST a product
const createProduct = async(req, res) => {
    try{
        const products = await Product.create(req.body)
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//PUT a product
const updateProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) return res.status(404).json({message: 'Product not found'})
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
}

//DELETE product(s)
const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).json({message: 'Product not found'})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}