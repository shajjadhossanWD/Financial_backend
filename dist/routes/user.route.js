"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post("/registration", user_controller_1.registrationUser);
userRouter.post("/activate-user", user_controller_1.activateUser);
userRouter.post("/login", user_controller_1.loginUser);
userRouter.get("/logout", auth_1.isAuthenticated, user_controller_1.logoutUser);
userRouter.get("/refresh-token", user_controller_1.updateAccessToken);
userRouter.get("/me", (0, auth_1.authorizeRoles)('user'), auth_1.isAuthenticated, user_controller_1.getUserInfo);
userRouter.post("/social-auth", user_controller_1.socialAuth);
userRouter.put("/update-user-info", auth_1.isAuthenticated, user_controller_1.updateUserInfo);
userRouter.put("/update-user-password", auth_1.isAuthenticated, user_controller_1.updatePassword);
userRouter.put("/update-user-avatar", auth_1.isAuthenticated, user_controller_1.updateProfilePicture);
userRouter.get("/get/all", user_controller_1.getAllUsers);
userRouter.delete("/delete/:id", user_controller_1.deleteUserById);
userRouter.delete("/delete/all", user_controller_1.deleteAllUsers);
exports.default = userRouter;
