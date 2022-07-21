import express from 'express';
import CompanyController from '../Controllers/CompanyController';
import auth from '../middleware/auth';
const router = express.Router();

router.get('/companies', CompanyController.getCompanies);
router.get('/company/:id', CompanyController.getCompany);
router.post('/company', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return CompanyController.createCompany(req, res);
});
router.patch('/company/:id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  CompanyController.patchCompany(req, res);
});
router.delete('/company/:id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  CompanyController.deleteCompany(req, res);
});

export default router;
