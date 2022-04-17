const cloudinary = require("cloudinary").v2;
const path = require('path');
cloudinary.config({
  cloud_name: "dblpwxmnh",
  api_key: "132635623228588",
  api_secret: "zKL9yMEaoZfV2fghdY6X6-pxdvo",
});

function uploadImage(files){
    return new Promise(async (resolve, reject)=>{
        try {
            const _dir = path.join(__dirname, "../public/images/")
            let _imageList = [];
            for(let i = 0; i<files.length; i++){
                let result = await cloudinary.uploader.upload(_dir + files[i].originalname, {
                    public_id: `kien/${files[i].originalname}`
                });
                _imageList.push(result.url)
            }
            resolve(_imageList);        
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    uploadImage
}