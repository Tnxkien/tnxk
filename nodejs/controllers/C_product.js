const express = require("express");
const router = express.Router();

// Gọi config
const config = require("../core/config");
// Gọi admin
const admin = require("../core/admin");
// Gọi html
const html = require("../core/html");
// Gọi model
const productModel = require("../models/M_product");
const tokenModel = require("../models/M_token");
const userModel = require("../models/M_user");

// Gọi json web token
const jwt = require("jsonwebtoken");
// khóa bí mật
const secret = "#$#@#dsds";
// middileware upload
const storage = require("../middlewares/multer");
//cloundiary
const { uploadImage } = require("../middlewares/cloundiary");

router.get("/list", async (req, res) => {
  try {
    let _res = await productModel.find();
    res.status(200).send(_res);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    let slug = req.params.slug;
    let _res = await productModel.find({
      slug: slug,
    });
    res.status(200).send(_res);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get(
  "/index(/:pageNumber)?",

  // check login
  (req, res, next) => {
    if (req.cookies.token == undefined) {
      res.redirect("/login.html");
    } else {
      next();
    }
  },

  // check token
  (req, res, next) => {
    // status: chỉ có 1 user login, không cho sử dụng cùng 1 lúc
    // check có tồn tại trong db hay không
    tokenModel.find({ token: req.cookies.token }, (err, data) => {
      if (err) {
        res.send({ kq: 0, msg: "Kết nối Database thất bại." });
      } else {
        if (data == "") {
          res.send({ kq: 0, msg: "Token không hợp lệ." });
        } else {
          // check thời gian sử dụng token
          jwt.verify(req.cookies.token, secret, function (err, decoded) {
            if (err) {
              res.send({ kq: 0, msg: "Token đã hết hạn sử dụng" });
            } else {
              next();
            }
          });
        }
      }
    });
  },

  // check vai trò
  (req, res, next) => {
    jwt.verify(req.cookies.token, secret, function (err, decoded) {
      if (err) {
        res.send({ kq: 0, msg: "Token đã hết hạn sử dụng" });
      } else {
        // Lấy được id từ token
        userModel.find({ _id: decoded.id }, (err, data) => {
          if (err) {
            res.send({ kq: 0, msg: "Kết nối Database thất bại." });
          } else {
            if (data == "") {
              res.send({ kq: 0, msg: "Không tồn tại Thành Viên này." });
            } else {
              // Lấy ra vai trò của thành viên
              // 1. admin : toàn quyền
              // 2. user : không được xóa
            

              var role = data[0].role;

              if (role == "admin" || role == "user") {
                next();
              } else {
                res.send({
                  kq: 0,
                  msg: "Bạn không đủ vai trò để vào link này.",
                });
              }
            }
          }
        });
      }
    });
  },

  async (req, res) => {
    // sử dụng admin
    const use_admin = new admin(config.url, req.originalUrl);
    // sử dụng html
    const use_html = new html(config.url, req.originalUrl);

    // Lấy giá trị tìm kiếm sau ?s=
    const search = req.query.s;

    var obj_s = { trash: false };

    if (search != "" && search != undefined)
      obj_s["name"] = { $regex: ".*" + search + ".*" };

    // Phân trang sản phẩm
    const limit = 5;
    const pageNumber = req.params.pageNumber;

    var skip = 0;
    var currentPage = 1;

    if (pageNumber != undefined && pageNumber != 1) {
      skip = (pageNumber - 1) * limit;
      currentPage = pageNumber;
    }

    // Gọi pagination html
    const list_data = await productModel.find({ trash: false });
    const sumPage = Math.ceil(list_data.length / limit);
    const pagination = use_html.pagination(sumPage, parseInt(currentPage));

    // danh sách sản phẩm
    productModel
      .find(obj_s)
      .limit(limit)
      .skip(skip)
      .sort({ _id: -1 }) // sắp xếp
      .exec((err, data) => {
        if (err) {
          res.send({ kq: 0, err });
        } else {
          // tạo object cho sản phẩm
          var array_table = [];

          data.forEach((e) => {
            array_table.push({
              id: e._id,
              name: e.name,
              price: e.price,
              status: e.status,
            });
          });

          res.render("index", {
            url: config.url,
            sidebar_menu: use_admin.sidebar_menu(),
            name_module: use_admin.link_convert_name(),
            link_module: use_admin.get_name_module(),
            array_table: product_table(
              array_table,
              use_admin.get_name_module()
            ),
            search,
            pagination,
            main: "product/main",
          });
        }
      });
  }
);

router.get("/detail/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    let product = await productModel.findById(_id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/add", (req, res) => {
  // sử dụng admin
  const use_admin = new admin(config.url, req.originalUrl);
  // sử dụng html
  const use_html = new html(config.url, req.originalUrl);

  const arr_option = [
    { name: "Ốp Lưng", value: "Ốp lưng" },
    { name: "Phụ Kiện Khác", value: "Phụ Kiện Khác" },
  ];

  const array_form = [
    {
      element: "input",
      type: "text",
      name: "name",
      class: "name",
      id: "name",
      value: "",
      placeholder: "Vui lòng nhập Tên",
    },
    {
      element: "input",
      type: "text",
      name: "slug",
      class: "slug",
      id: "slug",
      value: "",
      placeholder: "Vui lòng nhập thể loại",
    },
    {
      element: "select",
      arr_option,
      name: "id_parent",
      class: "id_parent",
      id: "id_parent",
      value: "",
      placeholder: "",
    },
    {
      element: "input",
      type: "number",
      name: "_price",
      class: "_price",
      id: "_price",
      value: "",
      placeholder: "Vui lòng nhập Giá Tiền",
    },

  ];

  res.render("index", {
    url: config.url,
    sidebar_menu: use_admin.sidebar_menu(),
    name_module: use_admin.link_convert_name(),
    link_module: use_admin.get_name_module(),
    form: use_html.html_form_product(array_form),
    main: "product/form",
  });
});

router.get("/phukienkhac", async (req, res)=>{
  try {
    res.send(await productModel.find({id_parent: "Phụ Kiện Khác"}))
  } catch (error) {
    
  }
})

router.post("/processForm", storage ,async (req, res) => {
  // khai báo
  let _name = (_slug = _id_parent = _content = error = ""),
    _price = 0,
    flag = 1;
  let files = req.files;
  // lấy dữ liệu
  _name = req.body.name;
  _slug = req.body.slug;
  _id_parent = req.body.id_parent;
  _price = req.body.price;
  _content = req.body.content;
  if (flag == 1) {
    let imageList = await uploadImage(files);

    productModel
      .find({ name: _name }) // check name
      .exec((err, dataName) => {
        if (err) {
          res.send({ kq: 0, error: err });
        } else {
          if (dataName == "") {
            productModel
              .find({ slug: _slug }) // check slug
              .exec(async (err, dataSlug) => {
                if (err) {
                  res.send({ kq: 0, error: err });
                } else {
                    // thêm vào db
                    const obj = {
                      name: _name,
                      slug: _slug,
                      price: _price,
                      content: _content,
                      img: imageList,
                      id_parent: _id_parent
                    };
                    // await productModel.deleteMany()
                    productModel.create(obj, (err, data) => {
                      if (err) {
                        res.send({ kq: 0, error: err });
                      } else {
                        res.send({ kq: 1, data });
                      }
                    });
                }
              });
          } else {
            res.send({
              kq: 0,
              error: "Dữ liệu đã tồn tại, vui lòng nhập Tên khác nhé.",
            });
          }
        }
      });
  } else {
    res.send({ kq: 0, error });
  }
});

router.get("/edit/:id", async (req, res) => {
  // sử dụng admin
  const use_admin = new admin(config.url, req.originalUrl);
  // sử dụng html
  const use_html = new html(config.url, req.originalUrl);

  const arr_option = [
    { name: "Ốp lưng", value: "Ốp lưng" },
    { name: "Phụ Kiện Khác", value: "Phụ Kiện Khác" },
  ];

  // Lấy dữ liệu ngay tại id này
  const rows = await productModel.find({ _id: req.params.id });
  const name_value = rows[0].name;
  const slug_value = rows[0].slug;
  const price_value = rows[0].price;
  const parent = rows[0].id_parent;
  const id = rows[0]._id;

  const array_form = [
    {
      element: "input",
      type: "text",
      name: "name",
      class: "name",
      id: "name",
      value: name_value,
      placeholder: "Vui lòng nhập Tên",
    },
    {
      element: "input",
      type: "text",
      name: "slug",
      class: "slug",
      id: "slug",
      value: slug_value,
      placeholder: "Vui lòng nhập Slug",
    },
    {
      element: "select",
      arr_option,
      name: "id_parent",
      class: "id_parent",
      id: "id_parent",
      value: parent,
      placeholder: "",
    },
    {
      element: "input",
      type: "number",
      name: "_price",
      class: "_price",
      id: "_price",
      value: price_value,
      placeholder: "Vui lòng nhập Giá Tiền",
    },
  ];

  res.render("index", {
    url: config.url,
    sidebar_menu: use_admin.sidebar_menu(),
    name_module: use_admin.link_convert_name(),
    link_module: use_admin.get_name_module(),
    form: use_html.html_form_product(array_form),
    rows,
    main: "product/edit",
  });
});

router.put('/update/:id', async (req, res)=>{
  try {
    const id = req.params.id;
    try {
      res.send(await productModel.findByIdAndUpdate(id, req.body));
    } catch (e) {
      res.send(e);
    }
  } catch (error) {
    
  }
})

router.post("/delete", (req, res) => {
  if (!req.body.id) {
    res.send({ kq: 0, msg: "Vui lòng truyền id." });
  } else {
    productModel.find({ _id: req.body.id }).exec((err, data) => {
      if (err) {
        res.send({ kq: 0, msg: "Kết nối Database thất bại." });
      } else {
        if (data == "") {
          res.send({ kq: 0, msg: "Không tồn tại sản phẩm này." });
        } else {
          productModel.findByIdAndDelete({ _id: req.body.id }, (err) => {
            if (err) {
              res.send({ kq: 0, msg: "Kết nối Database thất bại." });
            } else {
              res.send({ kq: 1, msg: "Đã xóa thành công bạn nhé." });
            }
          });
        }
      }
    });
  }
});

router.post("/status", function (req, res) {
  var _id = req.body.id;
  var value = req.body.value;

  productModel.find({ _id }, (err, data) => {
    if (err) {
      res.send({ kq: 0, msg: "Kết nối Database thất bại." });
    } else {
      if (data == "") {
        res.send({ kq: 0, msg: "Dữ liệu không tồn tại." });
      } else {
        productModel.updateMany({ _id }, { status: value }, (err) => {
          if (err) {
            res.send({ kq: 0, msg: "Kết nối Database thất bại." });
          } else {
            res.send({ kq: 1, msg: "Cập nhật thành công." });
          }
        });
      }
    }
  });
});

function product_table(array = [], link = "") {
  // code html
  var str = "";
  let i = 0;

  array.forEach((e) => {
    i++;

    var checked = e.status == true ? "checked" : "";

    str +=
      `<tr class="even pointer" id="id_delete_` +
      e.id +
      `">
            
            <td class="a-center multil">
                <input type="checkbox" class="flat" name="table_records" value="` +
      e.id +
      `">
            </td>

            <td>` +
      i +
      `</td>
            
            <td>` +
      e.name +
      `</td>

            <td class=" ">
                ` +
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(e.price) +
      `
            </td>

            <td class=" "><input type="checkbox" id="status_` +
      e.id +
      `" ` +
      checked +
      ` onclick="js_status('` +
      e.id +
      `')"></td>
            
            <td class=" last">
                <a href="admin/` +
      link +
      `/edit/` +
      e.id +
      `" class="text-success">
                    <i class="fa fa-edit"></i> Sửa
                </a>
                |
                <a href="javascript:void(0)" class="text-danger" data-toggle="modal"
                    data-target=".bs-example-modal-sm" onclick="get_info_delete('` +
      e.name +
      `', '` +
      e.id +
      `')">
                    <i class="fa fa-trash"></i> Xóa
                </a>
            </td>
        </tr>`;
  });

  return str;
}

module.exports = router;
