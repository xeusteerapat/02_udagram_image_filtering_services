import { generateJWT } from './../middleware/auth';
import { User } from './../models/User';
import { Request, Response, NextFunction } from 'express';
import * as EmailValidator from 'email-validator';
import { hashPassword } from '../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password } = req.body;

    const isEmail = EmailValidator.validate(email);

    if (!isEmail) {
      return res
        .status(400)
        .send({ status: 'Error', message: 'Invalid Email' });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: 'Error', message: 'Please provide password' });
    }

    const isUserExist = await User.findByPk(email);

    if (isUserExist) {
      return res
        .status(422)
        .send({ status: 'Error', message: 'Email already exist' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(201).send(user.short);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || EmailValidator.validate(email)) {
      return res
        .status(400)
        .send({ status: 'Error', message: 'Invalid Email' });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: 'Error', message: 'Please provide password' });
    }

    const user = await User.findByPk(email);

    if (!user) {
      return res.status(401).send({ status: 'Error', message: 'Unauthorized' });
    }

    const payload = {
      id: user.id,
      fullname: user.fullname,
    };

    const userToken = generateJWT(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600,
    });

    res.status(200).send({
      status: 'Success',
      token: userToken,
      user: user.short,
    });
  } catch (error) {
    next(error);
  }
};
