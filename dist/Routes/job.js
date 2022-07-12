"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JobController_1 = __importDefault(require("../Controllers/JobController"));
const router = express_1.default.Router();
router.get('/jobs', (req, res) => {
    return JobController_1.default.getJobs(req, res);
});
router.get('/job/:id', (req, res) => {
    return JobController_1.default.getJob(req, res);
});
router.post('/job', (req, res) => {
    return JobController_1.default.createJob(req, res);
});
router.patch('/job/:id', (req, res) => {
    return JobController_1.default.patchJob(req, res);
});
router.delete('/job/:id', (req, res) => {
    return JobController_1.default.deleteJob(req, res);
});
exports.default = router;
