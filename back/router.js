const router = require("express").Router();

// We import all controllers
const mainController = require("./controllers/mainController")
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");
const activityController = require("./controllers/activityController"); 


//User signup route
router.post("/api/user/signup", userController.signup);
//user login route
router.post("/api/user/login", userController.login);
//user get profile route
router.get("/api/user/:id", userController.showUser)
//user delete profile
router.delete("/api/user/delete", userController.deleteUser);

module.exports = router;