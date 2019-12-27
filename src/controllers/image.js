const path = require('path');
const fs = require('fs');
const ctrl = {};
const {randomNumber} = require('../helpers/libs');

ctrl.index = (req,res) => {
    res.send('image index');
}

ctrl.create = (req,res) => {
    const imgUrl = randomNumber();
    const imageTempPath = req.file.path;
    console.log(req.file);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(__dirname,`../public/upload/${imgUrl}${ext}`);
    if(ext === '.jpg' || ext ==='.jpeg' || ext === '.gif' || ext === '.png'){
        fs.renameSync(imageTempPath,targetPath);
        res.send('todo bien');
    }
}

ctrl.like = (req,res) => {
    res.send('image like')
}

ctrl.comment = (req,res) => {
    res.send('image comment')
}

ctrl.remove = (req,res) => {
    res.send('image remove')
}


module.exports = ctrl;