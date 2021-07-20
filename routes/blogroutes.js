const express = require("express");
const controller = require("../controllers/blogController");
const {requireAuth} = require('../middleware/authmiddleware');

const router = express.Router();

//get all the blogs (GET REQUEST)
router.get('/', controller.get_blogs );

//create a new blog (POST REQUEST)
router.post('/',requireAuth, controller.create_post)

//Create a new blog form (VIEW)
router.get('/create',controller.blog_create_get);

//display a single blog (GET REQUEST)
router.get('/:id', controller.display_blog);

//Delete a single blog
router.delete('/:id', controller.delete_blog );

module.exports = router;