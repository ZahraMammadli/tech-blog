const router = require("express").Router();

router.get("/login", (req, res) => {
  res.json({ msg: "login!" });

  //TODO catch error and make handlebar to go to correct page
});
