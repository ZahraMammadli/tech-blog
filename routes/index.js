const router = require("express").Router();
const apiRouter = require("./api");

apiRouter.use("/api", apiRouter);

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
