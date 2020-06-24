const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// update a post
router.patch('/:postID', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postID }, 
            { $set : 
                { 
                    title: req.body.title,
                    description: req.body.description
                }
            } 
        ); 
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;
