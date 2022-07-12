import express, { Request, Response } from 'express';
import CompanyController from '../Controllers/CompanyController';
import searchModel from '../middleware/searchModel';
import company from '../Models/company';
const router = express.Router();

router.get('/companies', (req: Request, res: Response) => {
  CompanyController.getCompanies(req, res);
});

router.get('/company/:id', searchModel({ model: company }), (req, res) => {
  CompanyController.getCompany(req, res);
});

router.post('/company', (req, res) => {
  CompanyController.createCompany(req, res);
});

router.patch('/company/:id', (req, res) => {
  CompanyController.patchCompany(req, res);
});

router.delete('/company/:id', (req, res) => {
  CompanyController.deleteCompany(req, res);
});

export default router;
