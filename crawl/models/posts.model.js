const sql = require("./db.js");
const Posts = function(post) { 
    this.title = post.title;
    this.description = post.description;
    this.tag = post.tag;
    this.author = post.author;
    this.view_count=post.view_count;
};
Posts.findById = (postId, result) => {
    sql.query(`select * from postdata where id= ${postId}`,(err, res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if (res.length)
        {
            console.log("found post: ",res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: "not_found"},null);
    });
};
Posts.findAll = result => {
    sql.query("select * from postdata",(err,res)=>{
        if(err) {
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("posts: ",res);
        result(null,res);
    });
};
Posts.findByAuthor = (author, result)=> {
    sql.query(`select * from postdata where author like '%${author}%'`,(err,res)=>{
        if (err) {
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if (res.length) {
            let i;
            for(i=0;i<res.length;i++) {
                console.log("found post: ",res[i]);
            }
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    })
}
module.exports = Posts;