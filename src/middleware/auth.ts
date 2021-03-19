import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export const hashPassword = async (plainText: string) => {
  const hashPassword = await argon2.hash(plainText);

  return hashPassword;
};

export const comparePassword = async (
  hashPassword: string,
  inputPassword: string
) => {
  const verify = await argon2.verify(hashPassword, inputPassword);

  return verify;
};

interface UserPayload {
  id: string;
  fullname: string;
}

interface JWTExpiry {
  expiresIn: number;
}

export const generateJWT = (
  payload: UserPayload,
  jwtSecretKey: string,
  expiry: JWTExpiry
) => {
  const token = jwt.sign(payload, jwtSecretKey, expiry);

  return token;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({ status: 'Error', message: 'Unauthorized' });
    }

    const bearerToken = req.headers.authorization.split(' ');

    if (bearerToken.length !== 2) {
      return res
        .status(401)
        .send({ status: 'Error', message: 'Invalid Token' });
    }

    const verifyToken = jwt.verify(bearerToken[1], process.env.JWT_SECRET_KEY);

    if (verifyToken) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};
