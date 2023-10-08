import mongoose, { Document, Schema } from "mongoose";
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
  phoneNumber: number;
  designation: string;
  dateOfBirth: Date;
  institute: string;
  experience: string;
  nidPassport: string;
  profileImage?: string;
  certificate?: string;
  bankInfo?: IBankInfo;
  address: string;
  signature?: string;
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    nidPassport: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    certificate: {
      type: String,
      // required: true,
    },
    bankInfo: {
      bankName: {
        type: String,
      },
      branchName: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
    },
    address: {
      type: String,
      required: true,
    },
    signature: {
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

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
