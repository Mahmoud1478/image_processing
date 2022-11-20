"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfThumbExistMiddleware = exports.imagetExistMiddleware = exports.validatePramsMiddleware = void 0;
var imageService_1 = require("../services/imageService");
var validator_1 = __importDefault(require("../validation/validator"));
var validatePramsMiddleware = function (request, response, next) {
    var errors = (0, validator_1.default)(request, {
        name: ["required"],
        height: ["required", "intiger"],
        width: ["required", "intiger"],
    });
    if (errors.length) {
        return response.status(422).render("error", {
            code: 422,
            msg: "validation errors",
            errors: errors,
        });
    }
    next();
};
exports.validatePramsMiddleware = validatePramsMiddleware;
var imagetExistMiddleware = function (req, res, next) {
    var name = req.query.name;
    if (!(0, imageService_1.imageExists)(name)) {
        return res.status(404).render("error", {
            code: 404,
            msg: "image not found",
            errors: [],
        });
    }
    next();
};
exports.imagetExistMiddleware = imagetExistMiddleware;
var checkIfThumbExistMiddleware = function (req, res, next) {
    var file = (0, imageService_1.thumbExists)(req.query.name, req.query.width, req.query.height);
    if (file) {
        return res.status(200).sendFile(file);
    }
    next();
};
exports.checkIfThumbExistMiddleware = checkIfThumbExistMiddleware;
