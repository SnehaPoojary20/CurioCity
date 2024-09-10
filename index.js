const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride=require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"snehapoojary",
        content:"Where there is a will there is a way !!",
    },
    {
        id:uuidv4(),
        username:"marypathan",
        content:"Everything happens for a reason",
    },
    {
        id:uuidv4(),
        username:"kunalpoojary",
        content:"Don't overthink about little things",
    },

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts", (req,res)=> {
    let{username,content}=req.body;
    let id=uuidv4();
    console.log(id);
    posts.push({ id,username,content});
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
          res.render("show.ejs", { post });
    }
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body;
    let post=posts.find((p)=>id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/potst/:id",(req,res)=>{
    let id=req.params;
    post=posts.filter((p)=>id !== p.id);
    res.render("/posts");

})
app.listen(port,()=>{ 
    console.log(`Listening at port ${port}`);
})
