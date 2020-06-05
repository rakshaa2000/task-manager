const mongoose= require('mongoose');

const labelSchema= mongoose.Schema({
  name: {type: String, required: true},
});

module.exports=mongoose.model('Label', labelSchema);