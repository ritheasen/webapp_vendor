const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    getProductById,
    getProductOwnedBySpecificUser,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')


router.post('/create',protect, createProduct)
router.get('/', getAllProducts)
router.get('/ofuser/:userId', getProductOwnedBySpecificUser)

module.exports = router