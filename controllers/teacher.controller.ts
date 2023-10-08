require("dotenv").config();
import teacherModel, { ITeacher } from "../models/teacher.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { NextFunction, Request, Response } from "express";

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
