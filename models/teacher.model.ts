import mongoose, { Document, Model, Schema } from "mongoose";
import customAutoIncrementId from "../middleware/customAutoIncrementId";

interface IBankInfo {
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
}

export interface ITeacher extends Document {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: number;
  designation: string;
  experience: string;
  profileImage?: string;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    id: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      // required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Apply the middleware to the schema with a prefix
TeacherSchema.pre("save", customAutoIncrementId("id", 100, "T"));

const teacherModel: Model<ITeacher> = mongoose.model("Teacher", TeacherSchema);

export default teacherModel;
