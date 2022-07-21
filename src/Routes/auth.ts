import express from 'express';
import authMiddleware from '../middleware/auth';
const router = express.Router();
import auth from '../middleware/auth';

router.post(
  '/signUp',
  authMiddleware.checkIfEntityIsLoggedIn,
  authMiddleware.signUp
);
router.post(
  '/signUp/user',
  authMiddleware.checkIfEntityIsLoggedIn,
  authMiddleware.signUp
);
router.post(
  '/signUp/company',
  authMiddleware.checkIfEntityIsLoggedIn,
  authMiddleware.signUp
);
router.post(
  '/login/user',
  authMiddleware.checkIfEntityIsLoggedIn,
  authMiddleware.login
);
router.post(
  '/login/company',
  authMiddleware.checkIfEntityIsLoggedIn,
  authMiddleware.login
);
router.post('/logout', auth.checkAuth, authMiddleware.logout);

export default router;
