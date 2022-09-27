const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Gets all posts - GET Request
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({ message: err });
    }
});

// Submits a post - POST Request
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save()
        res.json(savedPost);
    } catch(err) {
        res.json({ message: err });
    }
    

});
// Gets a specific post - GET Request
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({ message: err });
    }
});

// Deletes a specific post - DELETE Request
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

// Updates a Specific Post - PATCH Request
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, description: req.body.description } }
        );
        res.json(updatedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;