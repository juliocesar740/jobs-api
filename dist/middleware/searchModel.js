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
function searchModel(options) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchModelById = yield options.model.findById(req.params.id);
                if (!searchModelById) {
                    return res
                        .status(404)
                        .json({ msg: `${options.model.modelName} not found` });
                }
                req.model = searchModelById;
                next();
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Server error' });
            }
        });
    };
}
exports.default = searchModel;
