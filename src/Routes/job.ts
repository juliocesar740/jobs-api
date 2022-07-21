import express from 'express';
import JobController from '../Controllers/JobController';
import auth from '../middleware/auth';
const router = express.Router();

router.get('/jobs', (req, res) => {
  return JobController.getJobs(req, res);
});

router.get('/job/:job_id', (req, res) => {
  return JobController.getJob(req, res);
});

router.post('/job', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return JobController.createJob(req, res);
});

router.patch('/job/:job_id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return JobController.patchJob(req, res);
});

router.delete('/job/:job_id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('company', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return JobController.deleteJob(req, res);
});

router.post(
  '/job/:job_id/select/user/:user_id',
  auth.checkAuth,
  async (req, res, next) => {
    if (!(await auth.checkRole('company', req, res, next))) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    return JobController.selectUser(req, res);
  }
);

export default router;
