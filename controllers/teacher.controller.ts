require("dotenv").config();
import teacherModel, { ITeacher } from "../models/teacher.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { createTeacher } from "../services/teacher.service";

export const getAllTeacher = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await teacherModel.find().lean();

      // If no teachers
      if (!teachers?.length) {
        return res.status(400).json({ message: "No teachers found" });
      }

      res.status(200).json({
        success: true,
        teachers,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// create teacher
export const uploadTeacher = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      createTeacher(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get teacher by id
export const getSingleTeacher = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherId = req.params.id;

      const teacher = await teacherModel.findOne({ id: teacherId }).lean();

      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
