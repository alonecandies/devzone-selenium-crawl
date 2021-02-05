module.exports = app => {
    const posts = require("../controllers/posts.controller");
    app.get("/posts",posts.findAll);
    app.get("/posts/:postId",posts.findById);
    app.get("/author/:author",posts.findByAuthor);
}