"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imageService_1 = require("../services/imageService");
var checkIfImageExistMiddleware = function (req, res, next) {
    var file = (0, imageService_1.thumbExists)(req.query.name, req.query.width, req.query.height);
    if (file) {
        return res.status(200).sendFile(file);
    }
    next();
};
exports.default = checkIfImageExistMiddleware;
