const express = require("express");
const cors = require("cors");
const app = express();
const Post = require("./post");
require('dotenv').config()
const axios = require('axios').default;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD:server/app.js
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
=======
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5504"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
>>>>>>> staging:app.js


//check
app.get("/", (req, res) => {
    res.send('Hello World!');
  });

//GET
app.get("/posts", (req, res) => {
  res.send(Post.all);
});


// get a specific post
app.get("/posts/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id > Post.all.length || !id) {
          throw new Error("item not found");
        }
        const post = Post.getPost(id);
        res.send([post.name, post.title, post.message, post.comments, post.reactions, post.gifUrl]);
      } catch (error) {
        res.statusCode = 404;
        res.send(error.message);
      }
});

app.get("/posts/name/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id > Post.all.length || !id) {
          throw new Error("item not found");
        }
        const post = Post.getPost(id);
        res.send(post.name);
      } catch (error) {
        res.statusCode = 404;
        res.send(error.message);
      }
  });

app.get("/posts/title/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (id > Post.all.length || !id) {
          throw new Error("item not found");
        }
        const post = Post.getPost(id);
        res.send(post.title);
      } catch (error) {
        res.statusCode = 404;
        res.send(error.message);
      }
});

app.get("/posts/comments/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id > Post.all.length || !id) {
      throw new Error("item not found");
    }
    const post = Post.getPost(id);
    res.send(post.comments);
  } catch (error) {
    res.statusCode = 404;
    res.send(error.message);
  }
});
   
app.get("/gifs/:search", (req, res) => {

  try {
    const search = req.params.search;

    if (search.length === 0) {
      throw new Error('No search term')
    }
    const url = `https://api.giphy.com/v1/gifs/search?&api_key=boz8v8QN3CXVyMxFjoGU5eOKXGgi2PoJ&q=${search}&limit=25`
    
    axios.get(url)
    .then(function (response) {
      res.send(response.data.data)
    })
    .catch(function (error) {
      res.send(error.message)
    })
  } catch (error) {
    res.send(error.message)
  }
})


//POST
app.post("/posts/new", (req, res) => {
  
  Post.addPost(req.body);
  res.statusCode = 201;
  res.send(Post.all);
});

app.post("/posts/comments/new", (req, res) => {
  const id = parseInt(req.body.id);
  const comment = req.body.comments;
  Post.addComment(id, comment);
  const post = Post.getPost(id);
  res.send([post.comments]);
  res.statusCode = 201;
});


//UPDATE
app.put("/posts/reactions/update/:id", (req, res) => {

  try {

    const id = parseInt(req.params.id);
    const targetEmoji = req.body.target;
    Post.updateEmojis(id, targetEmoji);
    res.send("updated");

  } catch (error) {
    res.status = 404
    res.send(err.message)
  }
});

module.exports = app;
