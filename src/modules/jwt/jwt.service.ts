import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Users } from '../users/user.model';

function sign(user: Partial<Users>) {
  const token = jwt.sign(user, process.env.JWT_KEY || '');

  return token;
}

function verify(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_KEY || '');
  } catch {
    return null;
  }
}

export const jwtService = {
  sign,
  verify,
};
