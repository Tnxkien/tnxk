const express = require('express')
const router = express.Router()

// Gọi config
const config = require('../core/config')
// Gọi admin
const admin = require('../core/admin')
// Gọi Model
const categoryModel = require('../models/M_category')
const productModel = require('../models/M_product')

router.get('/list', (req, res) => {
  categoryModel
  .find()
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      res.send({kq:1, msg: data})
    }
  })
})

router.post('/add', function (req, res) {
  var name=slug=id_parent='';

  name=req.body.name;

  // Gọi admin ra sử dụng
  const use_admin = new admin();
  slug=use_admin.ChangeToSlug(name);

  id_parent=req.body.id_parent;

  categoryModel
  .find({name})
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      if(data==''){
        const obj_insert={name, slug};

        if(id_parent!=''){
          obj_insert['id_parent']=id_parent;
        }

        categoryModel
        .create(obj_insert, (err, data)=>{
          if(err){
            res.send({kq:0, msg: 'Kết nối DB thất bại'})
          }else{
            res.send({kq:1, msg: data})
          }
        })
      }else{
        res.send({kq:0, msg: 'Dữ liệu này đã tồn tại'})
      }
    }
  })

})

router.post('/edit/:id', function (req, res) {
  var name=slug=id_parent='';

  name=req.body.name;

  // Gọi admin ra sử dụng
  const use_admin = new admin();
  slug=use_admin.ChangeToSlug(name);

  id_parent=req.body.id_parent;

  categoryModel
  .find({_id: req.params.id})
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      if(data==''){
        res.send({kq:0, msg: 'Dự liệu không tồn tại'})
      }else{
        const obj_update={name, slug};

        if(id_parent!=''){
          obj_update['id_parent']=id_parent;
        }

        categoryModel
        .updateMany({_id: req.params.id}, obj_update, (err)=>{
          if(err){
            res.send({kq:0, msg: 'Kết nối DB thất bại'})
          }else{
            res.send({kq:1, msg: 'Cập nhật dữ liệu thành công'})
          }
        })
      }
    }
  })
})

router.get('/sidebar', (req, res) => {
  categoryModel
  .find()
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      // Gọi admin ra sử dụng
      const use_admin = new admin();
    
      // Phân tích dữ liệu
      var arr=[];
      
      data.forEach(e=>{
        arr.push({
          _id: e._id.toString(),
          name: e.name,
          slug: e.slug,
          parent: e.id_parent
        })
      })

      res.send({kq:1, msg: use_admin.dequy(arr)})
    }
  })
})

// Lấy ra thông tin chi tiết của danh mục thông qua slug
router.get('/info/:slug', (req, res) => {
  categoryModel
  .find({slug: req.params.slug})
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      res.send({kq:1, msg: data})
    }
  })
})

// Lấy ra danh sách sản phẩm từ id_category
router.get('/productList/:id_parent', (req, res) => {
  productModel
  .find({id_parent: req.params.id_parent})
  .exec((err, data)=>{
    if(err){
      res.send({kq:0, msg: 'Kết nối DB thất bại'})
    }else{
      res.send({kq:1, msg: data})
    }
  })
})

module.exports = router;