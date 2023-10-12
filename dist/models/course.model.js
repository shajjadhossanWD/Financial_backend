"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const customAutoIncrementId_1 = __importDefault(require("../middleware/customAutoIncrementId"));
exports.teacherSchema = new mongoose_1.Schema({
    fullName: String,
    profileImage: String,
    designation: String,
    experience: String,
});
const reviewSchema = new mongoose_1.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
});
const linkSchema = new mongoose_1.Schema({
    title: String,
    url: String,
});
const commentSchema = new mongoose_1.Schema({
    user: Object,
    question: String,
    questionReplies: Object,
});
const elementDataSchema = new mongoose_1.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Quiz",
    },
});
const chapterSchema = new mongoose_1.Schema({
    title: String,
    elements: [elementDataSchema],
    totalDuration: {
        type: String,
        default: "30 Min",
    },
});
const courseSchema = new mongoose_1.Schema({
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
    teacher: exports.teacherSchema,
    keyPoints: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    chapter: [chapterSchema],
});
// Apply the middleware to the schema with a prefix
courseSchema.pre("save", (0, customAutoIncrementId_1.default)("id", 100, "C"));
const CourseModel = mongoose_1.default.model("Course", courseSchema);
exports.default = CourseModel;
