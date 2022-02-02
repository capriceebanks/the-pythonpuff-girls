const postData = require("./postdata.json");

class Post {
  constructor(data) {
    this.id = data.id;
    this.message = data.message;
    this.emojis = {emoji1: 0, emoji2: 0, emoji3: 0};
    this.comments = []; 
    this.gifUrl = data.gifUrl
  }
  static get all() {
    return postData
  }
  static addPost(data) {
    const id = postData.length + 1;
    const newPost = new Post({id: id, ...data});
    postData.push(newPost);
    return Post.all
  }
  static getPost(id) {
    const posts = Post.all;

    const op = posts.filter(post => post.id === id)
    
    return op[0]
  }
  static addComment(id, comment) {
    const targetPost = Post.getPost(id);
    targetPost.comments.push(comment)
  }
  static updateEmojis(id, targetEmoji) {
    const targetPost = Post.getPost(id);

    targetPost.emojis[targetEmoji] ++

    return targetPost
  }

}

module.exports = Post;
