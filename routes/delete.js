const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// delete a post from database
router.delete('/:postID', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postID });
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;