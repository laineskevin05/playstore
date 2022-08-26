"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        //Promesas
        mongoose_1.default
            .connect(process.env.MONGODB_URI || "")
            .then(() => {
            console.log("Se conecto a mongo");
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
exports.Database = Database;
