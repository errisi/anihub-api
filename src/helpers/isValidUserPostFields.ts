import { isNumberValid } from './isNumberValid';

export const isValidUserPostFields = (
  name: string,
  email: string,
  password: string,
  age: string | null,
  sex: 'm' | 'f' | null,
  about: string | null,
  avatarId: number | null,
) => {
  if (!name || name.trim().length <= 0 || typeof name !== 'string') {
    return false;
  }

  if (
    !password ||
    password.trim().length <= 0 ||
    typeof password !== 'string'
  ) {
    return false;
  }

  if (!email || email.trim().length <= 0 || typeof email !== 'string') {
    return false;
  }

  if (age) {
    if (age.trim().length <= 0 || typeof age !== 'string') {
      return false;
    }
  }

  if (sex) {
    if (sex !== 'm' && sex !== 'f') {
      return false;
    }
  }

  if (about) {
    if (typeof about !== 'string' && about !== null) {
      return false;
    }
  }

  if (avatarId) {
    if (!isNumberValid(avatarId)) {
      return false;
    }
  }

  return true;
};
