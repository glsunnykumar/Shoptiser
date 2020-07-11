const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const catlvl1Schema = mongoose.Schema({
    title : {type:String,required : true},
    content :{type:String,required : true},
    imagePath :{type:String , required : true},
    parentCategory:[{type: Schema.Types.ObjectId , ref: 'Category' }]
});

module.exports = mongoose.model('Categorylv1',catlvl1Schema);  