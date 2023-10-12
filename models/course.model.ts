import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import customAutoIncrementId from "../middleware/customAutoIncrementId";

interface IComment extends Document {
  user: object;
  question: string;
  questionReplies?: IComment[];
}

interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ITeacher extends Document {
  fullName: string;
  profileImage: string;
  designation: string;
  experience: string;
}

interface IElementData extends Document {
  title: string;
  type: string;
  // videoId: string;
  content: string;
  duration?: number;
  videoPlayer?: string;
  links: ILink;
  suggestions: string;
  questions: IComment[];
  quiz?: ObjectId;
}

interface IChapter extends Document {
  title: string;
  elements: IElementData[];
  totalDuration: string;
}

interface ICourse extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: string;
  tags: string;
  level: string;
  demoVideo: string;
  keyPoints: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  chapter: IChapter[];
  avgRating?: number;
  enrolledStudents?: number;
  teacher: ITeacher;
  category: string;
}

export const teacherSchema = new Schema<ITeacher>({
  fullName: String,
  profileImage: String,
  designation: String,
  experience: String,
});

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: Object,
});

const elementDataSchema = new Schema<IElementData>({
  title: String,
  type: {
    type: String,
    required: true,
    enum: ["video", "document", "quiz"],
  },
  content: String,

  // content: {
  //   otp: { type: String },
  //   playbackInfo: { type: String },
  // },

  duration: {
    type: String,
    default: "5 Min",
  },
  videoPlayer: String,
  links: [linkSchema],
  suggestions: String,
  questions: [commentSchema],
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

const chapterSchema = new Schema<IChapter>({
  title: String,
  elements: [elementDataSchema],
  totalDuration: {
    type: String,
    default: "30 Min",
  },
});

const courseSchema = new Schema<ICourse>({
  id: {
    type: String,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    // pubic_id: {
    //   type: String,
    //   // required: true,
    // },
    // url: {
    //   type: String,
    //   // required: true,
    // },
  },
  tags: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  enrolledStudents: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    required: true,
  },
  demoVideo: {
    type: String,
    required: true,
  },
  teacher: teacherSchema,
  keyPoints: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  chapter: [chapterSchema],
});

// Apply the middleware to the schema with a prefix
courseSchema.pre("save", customAutoIncrementId("id", 100, "C"));

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;
