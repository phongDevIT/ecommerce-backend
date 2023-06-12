const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const {
    authMiddleWare,
    authUserMiddleWare,
} = require("../middleware/authMiddleware");

// router.post("/", userController.createUser);
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);
router.post("/log-out", userController.logoutUser);
router.get("/getAll", userController.getAllUser);
router.get(
    "/get-details/:id",
    authUserMiddleWare,
    userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
