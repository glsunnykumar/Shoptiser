const express = require('express');
const bodyParse = require('body-parser');

const Category = require('./models/category');
const mongoose = require('mongoose');
const { asap } = require('rxjs/internal/scheduler/asap');

const app = express();
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false')
    .then(
        () => {
            console.log('connected to database');
        })
    .catch(() => {
        console.log('connection failed');
    });

app.use(bodyParse.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,PUT,OPTIONS"
    );
    next();
});

app.post('/api/cat', (req, res, next) => {
    const category = new Category({
        title: req.body.title,
        content: req.body.content
    })
    console.log(category);
    category.save().then((result)=>{
        console.log(result);
        res.status(201).json({
            message: 'data post sucessfully',
            catId: result._id
        });
    });
   
});

app.get('/api/cat', (req, res, next) => {

    Category.find().then(documents => {
        res.status(200).json({
            message: 'Categories fetched suceesfully',
            categories: documents
        });
    })

});

app.delete('/api/cat/:id', (req, res, next) => {
    console.log(req.params.id);
    Category.deleteOne({_id : req.params.id}).then(result => {
        res.status(200).json({
            message: 'post deleted succesfully'
        });
    });
   
});

module.exports = app;