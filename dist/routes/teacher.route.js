"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controllers/teacher.controller");
const teacherRouter = express_1.default.Router();
teacherRouter.get("/get-teachers", teacher_controller_1.getAllTeacher);
exports.default = teacherRouter;
