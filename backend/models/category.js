const mongoose = require('mongoose');
const { schema } = require('./categorylvl1');
// Get the Schema constructor
var Schema = mongoose.Schema;

const catSchema = mongoose.Schema({
    title : {type:String,required : true},
    content :{type:String,required : true},
    imagePath :{type:String , required : true}
   
});

module.exports = mongoose.model('Category',catSchema);