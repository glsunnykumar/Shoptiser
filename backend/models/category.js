const mongoose = require('mongoose');

const catSchema = mongoose.Schema({
    title : {type:String,required : true},
    content :{type:String,required : true}
});

module.exports = mongoose.model('Category',catSchema);