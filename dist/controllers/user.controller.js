"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUserById = exports.getAllUsers = exports.updateProfilePicture = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
require("dotenv").config();
const user_model_1 = __importDefault(require("../models/user.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_service_1 = require("../services/user.service");
exports.registrationUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hitttedddddddddddddddddddddd');
        const { name, email, password } = req.body;
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default("Email already exists", 400));
        }
        const user = {
            name,
            email,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activation-mail.ejs"), data);
        try {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Activate Your Account",
                template: "activation-mail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
                activationToken: activationToken.token,
            });
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "24h",
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler_1.default("Invalid Activation Code", 400));
        }
        const { name, email, password } = newUser.user;
        // check exist user
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser) {
            return next(new ErrorHandler_1.default("Email already exist", 400));
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            user: user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.loginUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check email and password entered
        if (!email || !password) {
            return next(new ErrorHandler_1.default("Please enter email & password", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        // check invalid email and password
        if (!user) {
            return next(new ErrorHandler_1.default("Invalid email & password", 400));
        }
        // check password matched
        const isPasswordMatch = yield user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Wrong password", 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// logout user
exports.logoutUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        const keyExists = yield redis_1.redis.exists(userId);
        if (keyExists) {
            yield redis_1.redis.del(userId);
        }
        else {
            console.log(`Key ${userId} does not exist.`);
        }
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// update access token
exports.updateAccessToken = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const refresh_token = req.cookies.refresh_token as string;
        const refresh_token = req.header("Authorization");
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        if (!decoded) {
            return next(new ErrorHandler_1.default("Could not refresh the token", 400));
        }
        const session = yield redis_1.redis.get(decoded.id);
        if (!session) {
            return next(new ErrorHandler_1.default("Could not refresh the token", 400));
        }
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        req.user = user;
        // res.cookie("access_token", accessToken, accessTokenOptions);
        // res.cookie("refresh_token", refreshToken, refreshTokenOptions);
        res.status(200).json({
            status: "success",
            accessToken,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// get user info
exports.getUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// social auth
exports.socialAuth = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = yield user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { email, name } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const user = yield user_model_1.default.findById(userId);
        if (email && user) {
            const isEmailExist = yield user_model_1.default.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler_1.default("Email already exists", 400));
            }
            user.email = email;
        }
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        // update redis also
        yield redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updatePassword = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler_1.default("Please enter new and old password", 400));
        }
        const user = yield user_model_1.default.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id).select("+password");
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("Invalid user", 400));
        }
        const isPasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword));
        if (!isPasswordMatch) {
            return next(new ErrorHandler_1.default("Invalid old password", 400));
        }
        user.password = newPassword;
        yield user.save();
        // update redis also
        yield redis_1.redis.set((_e = req.user) === null || _e === void 0 ? void 0 : _e._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateProfilePicture = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    try {
        const { avatar } = req.body;
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
        const user = yield user_model_1.default.findById(userId);
        if (avatar && user) {
            // if we have one avatar from social signIn
            if ((_g = user === null || user === void 0 ? void 0 : user.avatar) === null || _g === void 0 ? void 0 : _g.public_id) {
                // first delete the old image
                yield cloudinary_1.default.v2.uploader.destroy((_h = user === null || user === void 0 ? void 0 : user.avatar) === null || _h === void 0 ? void 0 : _h.public_id);
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.url,
                };
            }
            else {
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.url,
                };
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        // update redis also
        yield redis_1.redis.set((_j = req.user) === null || _j === void 0 ? void 0 : _j._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        // Return the users
        res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        // Handle any errors
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        // Check if the user exists
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new ErrorHandler_1.default("User not found", 404);
        }
        // Delete the user
        yield user_model_1.default.findByIdAndDelete(userId);
        // Return success response
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        // Handle any errors
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
});
exports.deleteUserById = deleteUserById;
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.deleteMany();
        // Return success response
        res.status(200).json({
            success: true,
            message: "All users deleted successfully",
        });
    }
    catch (error) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteAllUsers = deleteAllUsers;
