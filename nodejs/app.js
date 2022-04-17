const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
// Mở port cho angular có thể truy xuất dữ liệu
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
// Gắn đường dẫn tĩnh
app.use(express.static('public'))

// Gọi ejs
app.set('view engine', 'ejs')

// Gọi cookie-paser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Gọi body-parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Gọi control
app.use('/', require('./core/control'))

// Gọi database
require('./core/database')

app.listen(port, () => console.log(`Example app listening on port ${port}!`))