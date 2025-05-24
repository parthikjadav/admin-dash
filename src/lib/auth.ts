import jwt from 'jsonwebtoken';
import config from './env';

export const decrypt = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const encrypt = (userId: string) => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '7d' });
} 