const express = require('express')
const router = express.Router()

// Gọi config
const config = require('../core/config')
// Gọi admin
const admin = require('../core/admin')

// router.get('/index', (req, res)=>{
//     // sử dụng admin
//     const use_admin = new admin(config.url);

//     res.render('index', {
//         url: config.url,
//         sidebar_menu: use_admin.sidebar_menu(),
//         main: 'partials/dashboard'
//     })
// })

router.get('/dequy', (req, res) => {
    var array=[
        {name: 'A', parents: ''},
        {name: 'B', parents: ''},

        {name: 'A1', parents: 'A'},
        {name: 'A2', parents: 'A'},

        {name: 'B1', parents: 'B'},
        {name: 'B2', parents: 'B'}
    ];

    res.send({ data: dequy(array) })
})

function dequy(array=[], id='', char='')
{
    var str='';

    array.forEach(e=>{
        var new_char=char;

        if(e.parents == id){
            str += '<option>'+ char + e.name +'</option>';
            //Gọi ra những thằng con
            str += dequy(array, e.name, new_char='|-----');
        }
    })

    return str;
}

router.get('/list', (req, res) => {
  res.send('GET request to the homepage')
})

module.exports = router;