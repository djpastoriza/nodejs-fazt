const path = require('path');
const fs = require('fs');
const ctrl = {};

// nodejs busca index por defecto
const {Image,Comment} = require('../models');

const {randomNumber} = require('../helpers/libs');

ctrl.index = async (req,res) => {
    // busca que el filename sea igual a req.params.image_id
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image);
    res.render('images',{image});
}

ctrl.create = (req,res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename:imgUrl});
        // si el nombre generado random se repite, llama de vuelta a la funcion
        // si no se repite, continua el proceso hasta guardarlo en BD
        if(images.length > 0){
            saveImage();
        }else{
            const imageTempPath = req.file.path;
            console.log(req.file);
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(__dirname,`../public/upload/${imgUrl}${ext}`);
            if(ext === '.jpg' || ext ==='.jpeg' || ext === '.gif' || ext === '.png'){
                fs.renameSync(imageTempPath,targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imgUrl + ext  
                });
                const imageSaved = await newImg.save();
                res.redirect('/images/' + imgUrl);
            }else{
                fs.unlinkSync(imageTempPath);
                return res.status(500).json({
                    ok:false,
                    msg:'El formato de la imagen no esta permitido'
                })
            }
            res.send('works');
        }
    };
    saveImage();
  
    
}

ctrl.like = (req,res) => {
    res.send('image like')
}

ctrl.comment = (req,res) => {
    const newComment = new Comment(req.body);

    res.send(newComment);
}

ctrl.remove = (req,res) => {
    res.send('image remove')
}


module.exports = ctrl;