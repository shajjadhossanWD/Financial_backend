import express from "express";
import {
  getAllTeacher,
  getSingleTeacher,
  uploadTeacher,
} from "../controllers/teacher.controller";
const teacherRouter = express.Router();

teacherRouter.get("/teachers", getAllTeacher);
teacherRouter.post("/teachers", uploadTeacher);
teacherRouter.get("/teachers/:id", getSingleTeacher);

export default teacherRouter;
