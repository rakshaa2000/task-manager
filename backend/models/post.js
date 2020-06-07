const mongoose= require('mongoose');

const postSchema= mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  label: {type: String, required: true},
  duedate: {type: Date},
  completed: {type: String}
});

module.exports=mongoose.model('Post', postSchema);
