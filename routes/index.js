var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res, next) {
  res.render('helloworld', { title: 'Hello, World in Express!' });
});

// Get Userlist page from the mongodb nodetest1
router.get("/userlist", function (req, res) {
  var db = req.db;
  var collection = db.get("usercollection");
  collection.find({}, {}, function (e, docs) {
    res.render("userlist", {
      "userlist": docs
    });
  });
});

// Get New User page
router.get("/newuser", function (req, res) {
  res.render("newuser", { title: "Add New User" });
});

// POST to add a user
router.post("/adduser", function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set collection
  var collection = db.get("usercollection");

  // Submit to ther DB
  collection.insert({
    "username": userName,
    "email": userEmail
  },
    function (err, doc) {
      if (err) {
        // if it fails, return error
        res.send("There is a problem adding the information to the DB");
      }
      else {
        // Forward to success page
        res.redirect("userlist")
      }
    });
});

module.exports = router;
