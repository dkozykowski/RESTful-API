const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// returns all of the posts from the database
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

// return a specific post
router.get('/:postID', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;