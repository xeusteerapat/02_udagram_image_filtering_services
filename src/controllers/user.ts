import { User } from './../models/User';
import { Request, Response, NextFunction } from 'express';

import * as EmailValidator from 'email-validator';

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

    const user = await User.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(user.short);
  } catch (error) {
    next(error);
  }
};
