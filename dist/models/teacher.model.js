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
const mongoose_1 = __importStar(require("mongoose"));
const customAutoIncrementId_1 = __importDefault(require("../middleware/customAutoIncrementId"));
const TeacherSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// Apply the middleware to the schema with a prefix
TeacherSchema.pre("save", (0, customAutoIncrementId_1.default)("id", 100, "T"));
exports.default = mongoose_1.default.model("Teacher", TeacherSchema);
