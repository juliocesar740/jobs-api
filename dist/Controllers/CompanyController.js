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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = __importDefault(require("../Models/company"));
class CompanyController {
    static getCompanies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield company_1.default.find({});
                return res.json({ companies: companies });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    static getCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({
                company: req.model
            });
        });
    }
    static createCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCompany = yield company_1.default.create(Object.assign({}, req.body));
                return res.status(201).json({ newCompany: newCompany });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    static patchCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield company_1.default.findById(req.params.id);
                if (!company) {
                    return res.status(404).json({ msg: 'Company not found' });
                }
                company.location = req.body.location;
                const updatedCompany = yield company.save();
                return res.json({ Company: updatedCompany });
            }
            catch (error) {
                return res.status(500).json({ msg: 'Server error' });
            }
        });
    }
    static deleteCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield company_1.default.findById(req.params.id);
                if (!company) {
                    res.status(404).json({ msg: 'company not found' });
                }
                yield company.deleteOne({ _id: company._id });
                return res.json({ msg: 'company deleted' });
            }
            catch (error) {
                return res.status(500).json({ msg: 'Server error' });
            }
        });
    }
}
exports.default = CompanyController;
