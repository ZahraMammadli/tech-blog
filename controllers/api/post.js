const router = require("express").Router();
const moment = require("moment");
const { request } = require("express");
const { Post, User, Comment } = require("../../models/index");
// Import the custom middleware
const withAuth = require("../../utils/auth");



// create new post

router.post("/newpost", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_body: req.body.post_body,
    user_id: req.session.user_id,
    date: moment(),
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// create new comment

module.exports = router;
