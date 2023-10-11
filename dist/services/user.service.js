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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const redis_1 = require("../utils/redis");
// get user by id
const getUserById = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const user = await userModel.findById(id);
    const userJson = yield redis_1.redis.get(id);
    if (userJson) {
        const user = JSON.stringify(userJson);
        res.status(201).json({
            success: true,
            user,
        });
    }
});
exports.getUserById = getUserById;
