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
exports.createCourse = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const course_model_1 = __importDefault(require("../models/course.model"));
// create course
exports.createCourse = (0, catchAsyncError_1.CatchAsyncError)((data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.create(data);
    res.status(201).json({
        success: true,
        course,
    });
}));
