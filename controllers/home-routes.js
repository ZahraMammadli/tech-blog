const router = require("express").Router();
const moment = require("moment");
const { request } = require("express");
const { Post, User, Comment } = require("../models/index");
// Import the custom middleware
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["comment_body", "date", "user_id"],
        },
      ],
    });

    const postings = posts.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      postings,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
// Use the custom withAuth before allowing the user to access the post

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const posts = await Post.findByPk(req.params.id, {
      //why it does not include comments?
      include: [
        {
          model: Comment,
          attributes: ["comment_body", "date", "user_id"],
        },
      ],
    });

    const postings = posts.get({ plain: true }); // just to get an actual content of the json
    console.log(postings);
    res.render("painting", {
      postings,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }

//   res.render("login");
// });
// module.exports = router;

// Get posts by user id
router.get("/dashboard", withAuth, async (req, res) => {
  //without auth for testing purposes
  // console.log("CHEEEEEEEECK!!!!!" + req.session.user_id);
  try {
    const user_posts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const user_postings = user_posts.map((post) => post.get({ plain: true }));

    console.log(user_postings);
    res.render("dashboard", {
      user_postings,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//  get create page

router.get("/newpost", withAuth, (req, res) => {
  Post.findAll({
    where: {
      id: req.session.id,
    },
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("newpost", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
