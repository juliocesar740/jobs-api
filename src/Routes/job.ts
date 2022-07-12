import express from 'express';
import JobController from '../Controllers/JobController';
const router = express.Router();

router.get('/jobs', (req, res) => {
  return JobController.getJobs(req, res);
});

router.get('/job/:id', (req, res) => {
  return JobController.getJob(req, res);
});

router.post('/job', (req, res) => {
  return JobController.createJob(req, res);
});

router.patch('/job/:id', (req, res) => {
  return JobController.patchJob(req, res);
});

router.delete('/job/:id', (req, res) => {
  return JobController.deleteJob(req, res);
});

export default router;
