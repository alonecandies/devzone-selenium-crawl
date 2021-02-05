const Post = require("../models/posts.model.js");
exports.findAll = (req, res) => {
    Post.findAll((err,data)=>{
        if(err)
            res.status(500).json({
                message:err.message||"Some error occurred."
            });
        else res.json(data);
    });
};
exports.findById = (req, res) => {
    Post.findById(req.params.postId, (err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).json({
                    message: `Not found post with id ${req.params.postId}.`
                });
            }     
            else {
                res.status(500).json({
                    message: "Error retrieving post with id " + req.params.postId
                });
            }
        } 
        else res.status(200).json(data);
  });
};
exports.findByAuthor = (req, res) => {
  Post.findByAuthor(req.params.author, (err,data)=>{
      if(err){
          if(err.kind==="not_found"){
              res.status(404).json({
                  message: `Not found post with author ${req.params.author}.`
              });
          }     
          else {
              res.status(500).json({
                  message: "Error retrieving post with author " + req.params.author
              });
          }
      }
      else res.status(200).json(data);
});
};
