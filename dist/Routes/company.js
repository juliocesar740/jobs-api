"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CompanyController_1 = __importDefault(require("../Controllers/CompanyController"));
const searchModel_1 = __importDefault(require("../middleware/searchModel"));
const company_1 = __importDefault(require("../Models/company"));
const router = express_1.default.Router();
router.get('/companies', (req, res) => {
    CompanyController_1.default.getCompanies(req, res);
});
router.get('/company/:id', (0, searchModel_1.default)({ model: company_1.default }), (req, res) => {
    CompanyController_1.default.getCompany(req, res);
});
router.post('/company', (req, res) => {
    CompanyController_1.default.createCompany(req, res);
});
router.patch('/company/:id', (req, res) => {
    CompanyController_1.default.patchCompany(req, res);
});
router.delete('/company/:id', (req, res) => {
    CompanyController_1.default.deleteCompany(req, res);
});
exports.default = router;
