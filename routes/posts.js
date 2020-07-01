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

// delete a post from database
router.delete('/:postID', async (req, res) => {
    try{
        const removedPost = await Post.remove({ noteID: req.params.postID });
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

// returns all active posts from the database
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find({ status: 'Active' })
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

// returns all posts from the database with their previous versions
router.get('/all', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

// returns all posts that fulfill given parameters
router.get('/p', async (req, res) => {
    try{
            var params = {};
            for (var propName in req.query) {
                // set date
                if (propName == "dateGT") { // date greather than
                    if (params["modified"]) continue;
                    if (req.query.dateLT) {
                        params["modified"] = { $lt: req.query.dateLT, $gt: req.query.dateGT };
                    } else
                        params["modified"] = { $gt: req.query.dateGT }; 
                } else if (propName == "dateLT") { // date less than
                    if (params["modified"]) continue;
                    if (req.query.dateGT) {
                        params["modified"] = { $lt: req.query.dateLT, $gt: req.query.dateGT };
                    } else {
                        params["modified"] = { $gt: req.query.dateLT };
                    }
    
                // set priority
                } else if (propName == "priorityGT") { // priority greater than
                    if (params["priority"]) continue;
                    if (req.query.priorityLT) {
                        params["priority"] = { $lt: req.query.priorityLT, $gt: req.query.priorityGT };
                    } else {
                        params["priority"] = { $gt: req.query.priorityGT };
                    }
                } else if (propName == "priorityLT") { // priority less than
                    if (params["priority"]) continue;
                    if (req.query.priorityGT) {
                        params["priority"] = { $lt: req.query.priorityLT, $gt: req.query.priorityGT };
                    } else {
                        params["priority"] = { $lt: req.query.priorityGT };
                    }
    
                // set rest of params
                } else {
                    params[propName] = req.query[propName];
                }
            }
            const posts = await Post.find(params);
            res.json(posts);
        }catch(err){
            res.json({message:err});
        }
});

// return the post with given noteID 
router.get('/ID=:postID', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});


// add a record to the database
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post.noteID = post._id;
    if (req.body.priority) post.priority = req.body.priority;
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;
