const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash("error", "Please log in first!");
  res.redirect("/login");
};

router.get("/", (req, res) => {
res.send("Welcome to the mentorship platform!");});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.get("/logout", authController.logoutUser);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
