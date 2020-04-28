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

router.get('/2', (req, res) => {
    res.send('We are on ebebe');
});

// posts a post to database
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);  
    }catch(err){
        res.json({message: err});
    }
});

// delete a post from database
router.delete('/:postID', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postID });
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

// update a post
router.patch('/:postID', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postID }, 
            { $set : { title: req.body.title} } 
        ); 
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;