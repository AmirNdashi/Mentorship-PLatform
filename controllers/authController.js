const User = require("../models/User");
const passport = require("passport");

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash("error", "Email already exists");
      return res.redirect("/register");
    }

    user = new User({ name, email, password, role });
    await user.save();
    req.flash("success", "Registration successful, please log in!");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/register");
  }
};

exports.loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.logoutUser = (req, res) => {
  req.logout(() => {
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  });
};
