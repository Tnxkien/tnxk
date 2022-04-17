const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://xuankien:niek2902@cluster0.rus3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{console.log('Kết nối thành công')})
.catch((error)=>{console.log(error)})