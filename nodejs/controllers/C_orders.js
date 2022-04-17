const express = require('express')
const router = express.Router()
const orderModel = require('../models/M_order');
// Gọi config
const config = require('../core/config')
// Gọi admin
const admin = require('../core/admin')
const { verifyAccessToken } = require('../middlewares/jwt');
const html = require("../core/html");

router.delete('/delete/:id', async (req, res)=>{
    try {
        let id = req.params.id;
        res.send(await orderModel.findByIdAndDelete(id));
    } catch (error) {
        
    }
})

router.get('/index', (req, res)=>{
    // sử dụng admin
    const use_admin = new admin(config.url);

    res.render('index', {
        url: config.url,
        name_module: use_admin.link_convert_name(),
        link_module: use_admin.get_name_module(),
        sidebar_menu: use_admin.sidebar_menu(),
        main: 'orders/mainod'
    })
})

router.get("/edit", async (req, res) => {
    
    const use_admin = new admin(config.url);

    res.render('index', {
        url: config.url,
        name_module: use_admin.link_convert_name(),
        link_module: use_admin.get_name_module(),
        sidebar_menu: use_admin.sidebar_menu(),
        main: 'orders/detail-order'
    })
});

router.get('/detail/:id', async (req, res)=>{
    try {
        let id = req.params.id;
        console.log(id)
        res.status(200).send(await orderModel.findById(id));
    } catch (error) {
        
    }
})

router.post('/', verifyAccessToken, async (req, res)=>{
    try {
        console.log(req.payload)
        const order = new orderModel({
            ...req.body,
            userID: req.payload.id,
            status: "WAITTING",
        })

        await order.save();
        
        res.status(200).send({
            message: "Order successfully!"
        })

    } catch (error) {
        
    }
})

router.post('/drop', async (req, res)=>{
    try {
        await orderModel.deleteMany()
        res.send("OK")
    } catch (error) {
        
    }
})

router.get('/getAll', async (req, res)=>{
    try {
        let result = await orderModel.find();
        res.status(200).send(result)
    } catch (error) {
        
    }
})

router.put('/update/:id', async (req, res)=>{
    try {
        let _id = req.params.id;
        let body = req.body;
        let result = await orderModel.findByIdAndUpdate(_id,body);
        return res.status(200).send(
            {
                message: result
            }
        );
    } catch (error) {
        
    }
})

module.exports = router;