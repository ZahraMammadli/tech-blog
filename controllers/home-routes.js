const router = require("express").Router();
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

    const postings = posts.get({ plain: true }); // what does plain true mean here?
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

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
module.exports = router;
