const express = require("express");
const Category = require("../models/category");
const CategoryLvl1 = require("../models/categorylvl1");
const multer = require("multer");
const category = require("../models/category");
const { populate } = require("../models/categorylvl1");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const invalid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if (invalid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});


router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const category = new Category({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        catlvl1: null
    })
    console.log(category);
    category.save().then((createdCat) => {
        res.status(201).json({
            message: 'data post  sucessfully',
            category: {
                ...createdCat,
                id: createdCat._id
            }
        });
    });

});


router.post("/lvl1", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const categorylvl1 = new CategoryLvl1({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        parentCategory: req.body.catId
    })
    console.log(categorylvl1);
    categorylvl1.save().then((createdCatLvv1) => {
        console.log(createdCatLvv1);
        res.status(201).json({
            message: 'data post sucessfully',
            categorylvl1: {
                ...createdCatLvv1,
                id: createdCatLvv1._id
            }
        });
    });
});



router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath: url + "/images/" + req.file.filename
    }
    const cat = new Category({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Category.updateOne({ _id: req.param.id }, cat).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update Succesfull" });
    });
})

router.get("/", (req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: 'Categories fetched suceesfully',
            categories: documents
        });
    })
});

router.get("/lvl1", (req, res, next) => {
    console.log("fetching catgory level 2");

    CategoryLvl1.findOne({}).populate('parentCategory')
        .then(documents => { 
            console.log(documents);
            res.status(200).json({
                message: 'Categories fetched suceesfully',
                categorieslvl1: documents
            })
        })


    // .exec((err,cat) =>{ 
    //         console.log(cat);

});

router.get("/:id", (req, res, next) => {
    Category.findById(req.params.id).then(cat => {
        if (cat) {
            res.status(200).json(cat);
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
})

router.get("/lvl1/:id", (req, res, next) => {
    CategoryLvl1.findById(req.params.id).then(cat => {
        if (cat) {
            res.status(200).json(cat);
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
})

router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Category.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'post deleted succesfully'
        });
    });
});

module.exports = router;