const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc    User post product
// @route   POST /api/products/create
// @access  Authenticated

const createProduct = asyncHandler(async (req, res) => {

    const { 
        title,
        description,
        price,
        quantity,
        imageUrl
    } = req.body

    if (!title || !description || !price) {
        throw new BadRequestError('Please fill all fields')
    }

    // Get the user's email from the authenticated user
    const userId = req.user._id;

    // Create product
    const product = await Product.create({
        title,
        description,
        price,
        quantity,
        imageUrl,
        // comments,
        // review,
        userId,
    })

    if (product) {
        res.status(201).json({
            _id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrl,
            comments: product.comments,
            review: product.review,
            userId: product.userId,
        })

    } else {
        throw new BadRequestError('Invalid product data')
    }

})

// @desc    Get all products
// @route   GET /api/products
// @access  Authenticated
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc    Get product owned by userId
// @route   GET /api/products/ofuser/:userId
// @access  Authenticated
const getProductOwnedBySpecificUser = asyncHandler(async (req, res) => {
    const product = await Product.find({ userId : req.params.userId  })
    if (product) {
        res.json(product)
    } else {
        throw new NotFoundError('Product not found')
    }
})

// @desc    Update product by product id owned by userId
// @route   PATCH /api/products/ofuser/:id
// @access  Authenticated

const updateProduct = asyncHandler(async (req, res) => {
    
})



module.exports = { createProduct, getAllProducts, getProductOwnedBySpecificUser }