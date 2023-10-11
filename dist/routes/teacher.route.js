"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controllers/teacher.controller");
const teacherRouter = express_1.default.Router();
teacherRouter.get("/teachers", teacher_controller_1.getAllTeacher);
teacherRouter.post("/teachers", teacher_controller_1.uploadTeacher);
teacherRouter.get("/teachers/:id", teacher_controller_1.getSingleTeacher);
exports.default = teacherRouter;
