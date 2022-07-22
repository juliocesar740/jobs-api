import express from 'express';
import UserController from '../Controllers/UserController';
import auth from '../middleware/auth';
const router = express.Router();

router.get('/users', (req, res) => {
  return UserController.getUsers(req, res);
});

router.get('/user/:id', (req, res) => {
  return UserController.getUser(req, res);
});

router.patch('/user/:id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('user', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return UserController.patchUser(req, res);
});

router.delete('/user/:id', auth.checkAuth, async (req, res, next) => {
  if (!(await auth.checkRole('user', req, res, next))) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  return UserController.deleteUser(req, res);
});

router.post(
  '/user/:user_id/apply/job/:job_id',
  auth.checkAuth,
  async (req, res, next) => {
    if (!(await auth.checkRole('user', req, res, next))) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    return UserController.applyToJob(req.body.action, req, res);
  }
);

export default router;
