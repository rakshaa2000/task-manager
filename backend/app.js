const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const Post=require('./models/post');
// const Label=require('./models/label');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect("mongodb+srv://raks:ffWDSewPKYAbFHAs@cluster0-2v91m.gcp.mongodb.net/db1?retryWrites=true&w=majority",{useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
  console.log('Connected to database');
});


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.get("/api/posts/:id", (req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message: "Post not found"});
    }
  });
});
// app.get("/api/posts/label/:label", (req,res,next)=>{
//   Post.find({label: req.params.label}).then(post=>{
//     if(post){
//       res.status(200).json(post);
//     }
//     else{
//       res.status(404).json({message: "Post not found"});
//     }
//   });
// });
// app.get("/api/labels/:id", (req,res,next)=>{
//   Label.findById(req.params.id).then(label=>{
//     if(label){
//       res.status(200).json(label);
//     }
//     else{
//       res.status(404).json({message: "Label not found"});
//     }
//   });
// });

app.post("/api/posts",(req,res,next)=>{
  const post= new Post({
    title: req.body.title,
    content: req.body.content,
    label: req.body.label,
    duedate: req.body.duedate,
    completed: req.body.completed
  });
  post.save();
  res.status(201).json({
    message:"Post added successfully"
  });
});

// app.post("/api/labels",(req,res,next)=>{
//   const post= new Label({
//     name: req.body.name,
//   });
//   post.save();
//   res.status(201).json({
//     message:"Label added successfully"
//   });
// });

app.put("/api/posts/:id", (req,res, next)=>{
  const post= new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    label: req.body.label,
    duedate: req.body.duedate,
    completed: req.body.completed
  });
  Post.updateOne({_id: req.params.id}, post).then(result=>{
    res.status(200).json({message: "Update successful!"});
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  // console.log('inside');
  Post.deleteOne({ _id: req.params.id }).then(result => {
    // console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

app.use('/api/posts',(req,res,next)=>{
  Post.find().sort({duedate: 1}).then(documents=>{
    res.status(200).json({
      message:'Posts fetched successfully',
      posts: documents
    });
  });
  // next();
});

// app.use('/api/labels',(req,res,next)=>{
//   Label.find().then(documents=>{
//     res.status(200).json({
//       message:'Labels fetched successfully',
//       labels: documents
//     });
//   });
//   // next();
// });

// app.delete("/api/posts/:id", (res,req,next) => {
//   console.log(req.params.id);
//   console.log('Hello,inside delete');
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({message:"This post is deleted"});
//   });
// });
// console.log('outside');


module.exports= app;
