const mongoose= require('mongoose');

const postSchema= mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  label: {type: String, required: true},
  completed: {type: String},
  duedate: {type: Date}
});

module.exports=mongoose.model('Post', postSchema);
