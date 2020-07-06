const express = require("express");
const Category = require("../models/category");
const multer = require("multer");

const router = express.Router();  

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' :'jpg',
    'image/jpg' :'jpg'
};

const storage = multer.diskStorage({
destination :(req,file,cb) =>{
    const invalid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if(invalid){
        error = null;
    }
    cb(null,"backend/images");
},
filename : (req,file,cb) =>{
const name = file.originalname.toLowerCase().split(' ').join('-');
const ext = MIME_TYPE_MAP[file.mimetype];
cb(null,name +'-'+Date.now()+'.'+ext);
}
});


router.post("",multer({storage : storage}).single("image"), (req, res, next) => {
    const url = req.protocol +"://" +req.get("host");
    const category = new Category({
        title: req.body.title,
        content: req.body.content,
        imagePath : url +"/images/" + req.file.filename
    })
    console.log(category);
    category.save().then((createdCat)=>{
        res.status(201).json({
            message: 'data post sucessfully',
           category :{
               ...createdCat,
             id : createdCat._id
           }
        });
    });
   
});

router.put("/:id",multer({storage : storage}).single("image"),(req,res,next) =>{
    let imagePath =req.body.imagePath;
    if(req.file){
        const url = req.protocol +"://" +req.get("host");
        imagePath : url +"/images/" + req.file.filename
    }
    const cat = new Category({
        _id :req.body.id,   
        title :req.body.title,
        content : req.body.content,
        imagePath : imagePath
    });
    Category.updateOne({_id:req.param.id},cat).then(result =>{
        console.log(result);
        res.status(200).json({message : "Update Succesfull"});
    });
})

router.get("", (req, res, next) => {

    Category.find().then(documents => {
        res.status(200).json({
            message: 'Categories fetched suceesfully',
            categories: documents
        });
    })

});

router.get("/:id",(req,res,next)=>{
    Category.findById(req.params.id).then(cat =>{
        if(cat){
            res.status(200).json(cat);
        }
        else{
            res.status(404).json({message : 'Post not found'});
        }
    })
})

router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Category.deleteOne({_id : req.params.id}).then(result => {
        res.status(200).json({
            message: 'post deleted succesfully'
        });
    });
   
});

module.exports = router;