import express from "express";
import {
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import upload from "../middleware/upload";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("user"),
  uploadCourse
);

courseRouter.patch(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("user"),
  upload.single("thumbnail"),
  editCourse
);

courseRouter.get("/courses/:id", getSingleCourse);

courseRouter.get("/courses", getAllCourses);

courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

export default courseRouter;
