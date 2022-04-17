const express = require('express')
const router = express.Router()

// Gọi config
const config = require('../core/config')
// Gọi admin
const admin = require('../core/admin')

router.get('/index', (req, res)=>{
    // sử dụng admin
    const use_admin = new admin(config.url);

    res.render('index', {
        url: config.url,
        name_module: use_admin.link_convert_name(),
        link_module: use_admin.get_name_module(),
        sidebar_menu: use_admin.sidebar_menu(),
        main: 'partials/dashboard'
    })
})

module.exports = router;