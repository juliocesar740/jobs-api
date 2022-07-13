import express from 'express';
import UserController from '../Controllers/UserController';
const router = express.Router();

router.get('/users', (req, res) => {
  return UserController.getUsers(req, res);
});

router.get('/user/:id', (req, res) => {
  return UserController.getUser(req, res);
});

router.post('/user', (req, res) => {
  return UserController.createUser(req, res);
});

router.patch('/user/:id', (req, res) => {
  return UserController.patchUser(req, res);
});

router.delete('/user/:id', (req, res) => {
  return UserController.deleteUser(req, res);
});

export default router;
