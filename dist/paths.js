"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicFolder = exports.views = exports.srcFolder = void 0;
var path_1 = __importDefault(require("path"));
exports.srcFolder = __dirname;
exports.views = path_1.default.join(__dirname, "./views");
exports.publicFolder = path_1.default.join(__dirname, "./public");
