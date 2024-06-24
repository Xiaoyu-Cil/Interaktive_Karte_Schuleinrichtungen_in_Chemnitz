const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require('../middlewares/authMiddleware');

router.get("/deleted", userController.all_deleted_user); //deleted user
router.get("/name/:name", userController.get_user); //get user profile
router.patch("/delete/:username", userController.soft_delete_user);
router.patch('/update/:username', userController.update_user); //update user info
router.get('/check_username/:username', userController.check_username_exists);
router.get('/check_email/:email', userController.check_email_exists);
router.get('/data', protect, userController.get_user_data);
router.get('/favorites/:username', userController.get_user_favorites);

module.exports = router;
