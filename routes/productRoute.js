const express = require('express');
const app = express();
app.use(express.json())
const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router();

//GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

//POST products
router.post('/', createProduct)

//PUT a product
router.put('/:id', updateProduct)

//DELETE a product
router.delete('/:id', deleteProduct)

module.exports = router