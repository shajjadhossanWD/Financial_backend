"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = require("./app");
const db_1 = __importDefault(require("./utils/db"));
// create server
app_1.app.listen(process.env.PORT, () => {
    console.log(`Server is connected with ${process.env.PORT}`);
    (0, db_1.default)();
});
