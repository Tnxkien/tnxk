const express = require('express')
const router = express.Router()

// Gọi config
const config = require('../core/config')
// Gọi admin
const admin = require('../core/admin')
// Gọi Model
const productModel = require('../models/M_product')

router.get('/list', (req, res) => {
    productModel
    .find()
    .exec((err, data)=>{
        if(err) res.send({kq:0, msg: 'Kết nối DB thất bại'})
        res.send({kq:1, msg: data})
    })
})

router.get('/data/:slug', (req, res) => {
    productModel
    .find({slug: req.params.slug})
    .exec((err, data)=>{
        if(err) res.send({kq:0, msg: 'Kết nối DB thất bại'})
        res.send({kq:1, msg: data})
    })
})

router.post('/update/content', (req, res)=>{
    var content=req.body.content;
    productModel
    .updateMany({_id: '620fa230e9f4fd9b04ac69c0'}, {content}, (err)=>{
        if(err) res.send({kq:0, msg: 'Kết nối DB thất bại'})
        res.send({kq:1, msg: 'Cập nhật thành công'})
    })
})

router.post('/update/parent/:id', (req, res)=>{
    var id_parent=req.body.id_parent;
    productModel
    .updateMany({_id: req.params.id}, {id_parent}, (err)=>{
        if(err) res.send({kq:0, msg: 'Kết nối DB thất bại'})
        res.send({kq:1, msg: 'Cập nhật thành công'})
    })
})

module.exports = router;