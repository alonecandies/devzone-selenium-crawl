var webdriver = require('selenium-webdriver');
var series = require('async/series');
var sql = require('./models/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const router = require('./routes/posts.routes')

//-----------------------------------------------------------//

let driver = new webdriver.Builder().forBrowser('chrome').build();
let posts=[];
let i=1;
function crawlDz(pageNum){
driver.get(`https://devzone.vn/?page=${pageNum}`).then(function(){
    driver.findElements(webdriver.By.className("post-view")).then(function(items){
        items.forEach(function(item){
            series({
            title : 
                function(callback){    
                    item.findElements(webdriver.By.className("title")).then(function(title){
                        title[0].getAttribute("innerText").then(function(tit){
                            callback(null,tit);
                        });
                    })},
            description : 
                    function(callback){    
                        item.findElements(webdriver.By.className("description")).then(function(description){
                            description[0].getAttribute("innerText").then(function(des){
                                callback(null,des);
                            });
                        })},
            author : 
                function(callback){
                    item.findElements(webdriver.By.className("author")).then(function(author){
                        author[0].getAttribute("innerText").then(function(au){
                            callback(null,au);
                        });
                    })},
            view : 
                function(callback){
                    item.findElements(webdriver.By.className("view")).then(function(view){
                        view[0].getAttribute("innerText").then(function(vi){
                            callback(null,vi);
                        });
                    })},
            tag : 
                function(callback){    
                    item.findElements(webdriver.By.className("view")).then(function(view){
                        view[1].getAttribute("innerText").then(function(tag){
                            callback(null,tag);
                        });
                    })},
                },function(err,results) { 
                    posts.push(results);
                    var inn=`insert into postdata (title, descript, author, view_count, tag) values ("${results.title}","${results.description}","${results.author}",${parseInt(results.view)},"${results.tag}")`;
                    sql.query(inn,(err,res) => {
                        if(err) throw err;
                        console.log("Inserted!");
                    })
                });
        });
    });
})
}

crawlDz(i);
//---------------------------------------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    res.json({message:"Welcome to my application."});
});
router(app)
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});