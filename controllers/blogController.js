const { get } = require("mongoose");
const Blog = require("../models/blog");

const get_blogs = (req,res) => {
    Blog.find()
    .then( (result) => {
        res.render("newindex" , { title: "Home", blogs: result});
    })
    .catch((err) => { 
        console.log(err);
    })
};

const create_post = (req,res) => {
    newBlog = new Blog(req.body);
    newBlog.save()
    .then((result) =>{
        console.log("Data added to the db successfully...");
    })
    .catch((err) => {
        console.log(err);
    })
    res.redirect('/blogs');
};

const blog_create_get = (req,res) => {
    res.render("newcreate", { title: "Create Post"});
};


const display_blog = (req,res) =>{
    const id = req.params.id;

    Blog.findById(id)
    .then( result =>{
        res.render("newdetails",{title: "Blog", blog: result});
    })
};

const delete_blog = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then( (result) => {
        res.json({redirect: '/blogs'});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports = {
    get_blogs,
    create_post,
    blog_create_get,
    display_blog,
    delete_blog
}