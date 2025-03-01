require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("../config/passportConfig"); 
const mongoose = require("../config/database");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const sessionRoutes = require("../routes/sessionRoutes");
const goalRoutes = require("../routes/goalRoutes");
const resourceRoutes = require("../routes/resourceRoutes");
const feedbackRoutes = require("../routes/feedbackRoutes");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({ 
  secret: "mentorshipSecret", 
  resave: false, 
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//  Make user data available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", sessionRoutes);
app.use("/goals", goalRoutes);
app.use("/resources", resourceRoutes);
app.use(express.static("public"));
app.use("/feedback", feedbackRoutes);
app.get("/test-static", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
