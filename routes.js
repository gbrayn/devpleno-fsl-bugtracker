const router = require("express").Router();
const controller = require("./controller");

router
  .route("/")
  .get((req, res) => res.render("home"))
  .post(controller.store);

module.exports = router;
