import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import teacherModel from "../models/teacher.model";

// create course
export const createTeacher = CatchAsyncError(
  async (data: any, res: Response) => {
    const teachers = await teacherModel.create(data);

    res.status(201).json({
      success: true,
      teachers,
    });
  }
);
