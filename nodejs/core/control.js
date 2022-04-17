const express = require('express')
const router = express.Router()

// Gọi routes
router.use('/admin/dashboard', require('../controllers/C_dashboard'))
router.use('/admin/product', require('../controllers/C_product'))
router.use('/admin/user', require('../controllers/C_user'))
router.use('/admin/category', require('../controllers/C_category'))
router.use('/admin/orders', require('../controllers/C_orders'))
// Gọi API
router.use('/api/category', require('../apis/A_categories'))
router.use('/api/product', require('../apis/A_products'))

// Login
router.get('/login.html', (req, res) => {
    res.render('login')
})

module.exports = router;