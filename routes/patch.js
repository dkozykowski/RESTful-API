const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// update a post
router.patch('/:postID', (req, res) => { 
    const updatedOne = Post.findOneAndUpdate(
        { 
            noteID: req.params.postID,
            status: 'Active'
        },
        { $set : { status: 'Outdated' }}, 
        { lean: true },
        function(err, result) {
            console.log(result);
            if (err) {
              res.send(err);
            } else {
                const newPost = new Post({
                    status:  'Active',
                    title:  req.body.title,
                    description: req.body.description,
                    priority: result.priority,
                    noteID: result.noteID,
                    created: result.created,
                    version: result.version + 1
                });
                newPost.save() 
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.json({ message:err });
                    });
            }
        }
    );
    console.log(updatedOne);
});

module.exports = router;
