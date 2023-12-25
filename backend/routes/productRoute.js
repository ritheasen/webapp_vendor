const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    getProductById,
    getProductOwnedBySpecificUser,
    createProduct,
    createProductt,
    updateProduct,
    deleteProduct,
    createComment,
} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')

router.post('/create',protect, createProduct)
router.get('/', getAllProducts)
router.get('/ofuser/:userId', getProductOwnedBySpecificUser)
router.delete('/delete/:id',protect, deleteProduct)
router.patch('/update/:id',protect, updateProduct)

router.put('/:id/comment', protect, createComment)


module.exports = router