/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/user';
import Company from '../Models/company';

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: 'The request is missing information' });
    }

    // the name of the model
    const model_name = req.originalUrl.split('/')[2];

    let entity;

    if (model_name === 'user') {
      entity = await User.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
      });
    } else {
      entity = await Company.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
      });
    }

    // create token
    const token = jwt.sign(
      { entity_id: entity.id },
      `${process.env.API_TOKEN}`,
      {
        expiresIn: '1h'
      }
    );

    res.cookie('token', token, { maxAge: 3600000 });
    res.cookie('role', model_name);

    return res.status(201).json({ msg: 'signed in', entity: entity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server error' });
  }
}
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: 'The request is missing information' });
    }

    // the name of the model
    const model_name = req.originalUrl.split('/')[2];

    // get the model class
    const Model = model_name === 'user' ? User : Company;

    let entity;

    if (model_name === 'user') {
      // find entity
      entity = await User.findOne({ email: req.body.email });
    } else {
      // find entity
      entity = await Company.findOne({ email: req.body.email });
    }

    if (
      !entity ||
      !(await bcrypt.compare(req.body.password, entity.password))
    ) {
      return res.status(403).json({ msg: 'The crenditials are incorrect' });
    }

    // create token
    const token = jwt.sign(
      { entity_id: entity.id },
      `${process.env.API_TOKEN}`,
      {
        expiresIn: '1h'
      }
    );

    res.cookie('token', token, { maxAge: 3600000 });
    res.cookie('role', model_name);

    return res.status(201).json({ msg: 'logged', entity: entity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server error' });
  }
}
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token');
    res.clearCookie('role');
    return res.status(200).json({ msg: 'Logged out' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
}
async function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send('A token is required for authentication');
    }
    // verify jwt
    jwt.verify(token, `${process.env.API_TOKEN}`);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    console.log(error);
    return res.status(400).json({ msg: 'Bad request' });
  }
}
async function checkRole(
  role: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return !req.cookies.role || req.cookies.role !== role ? false : true;
}

function checkIfEntityIsLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return req.cookies.token
    ? res.status(400).json({ msg: 'There is an entity logged in, you need to log out' })
    : next();
}

export default {
  signUp,
  login,
  logout,
  checkAuth,
  checkRole,
  checkIfEntityIsLoggedIn
};
