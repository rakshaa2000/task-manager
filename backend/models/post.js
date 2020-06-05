const mongoose= require('mongoose');

const postSchema= mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  label: {type: mongoose.Schema.Types.ObjectId, ref: 'Label'}
});

module.exports=mongoose.model('Post', postSchema);
