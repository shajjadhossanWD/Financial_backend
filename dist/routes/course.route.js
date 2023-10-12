"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const auth_1 = require("../middleware/auth");
const upload_1 = __importDefault(require("../middleware/upload"));
const courseRouter = express_1.default.Router();
courseRouter.post("/create-course", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("user"), course_controller_1.uploadCourse);
courseRouter.get("/courses", course_controller_1.getAllCourses);
courseRouter.get("/popular-courses", course_controller_1.getMostPopularCourses);
// courseRouter.put("/add-questions", isAuthenticated, addQuestion);
courseRouter.get("/get-course-content/:id", auth_1.isAuthenticated, course_controller_1.getCourseByUser);
courseRouter.get("/courses/:id", course_controller_1.getSingleCourse);
courseRouter.patch("/edit-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("user"), upload_1.default.single("thumbnail"), course_controller_1.editCourse);
exports.default = courseRouter;
