import express from "express";
import { getAllTeacher } from "../controllers/teacher.controller";
const teacherRouter = express.Router();

teacherRouter.get("/get-teachers", getAllTeacher);

export default teacherRouter;
