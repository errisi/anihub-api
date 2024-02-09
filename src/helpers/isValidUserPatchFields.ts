import { isNumberValid } from './isNumberValid';

export const isValidUserPatchFields = (
  name?: string,
  email?: string,
  password?: string,
  age?: string,
  sex?: string,
  about?: string,
  role?: {
    current: 'user' | 'premium' | 'admin' | 'moderator';
    period: string | null;
  },
  avatar?: string,
  wallpaper?: string,
  status?: {
    current: 'active' | 'limited' | 'blocked';
    period: string | null;
  },
  friends?: number[],
  achievements?: number[],
) => {
  if (name) {
    if (name.trim().length <= 0 || typeof name !== 'string') {
      return false;
    }
  }

  if (password) {
    if (password.trim().length <= 0 || typeof password !== 'string') {
      return false;
    }
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

  if (email) {
    if (email.trim().length <= 0 || typeof email !== 'string') {
      return false;
    }
  }

  if (about || about === null) {
    if (typeof about !== 'string' && about !== null) {
      return false;
    }
  }

  if (role) {
    if (
      role.current !== 'user' &&
      role.current !== 'premium' &&
      role.current !== 'admin' &&
      role.current !== 'moderator'
    ) {
      return false;
    }

    if (
      role.period !== null &&
      (role.period.trim().length <= 0 || typeof role.period !== 'string')
    ) {
      return false;
    }
  }

  if (avatar) {
    if (avatar.trim().length <= 0 || typeof avatar !== 'string') {
      return false;
    }
  }

  if (wallpaper) {
    if (wallpaper.trim().length <= 0 || typeof wallpaper !== 'string') {
      return false;
    }
  }

  if (status) {
    if (
      status.current !== 'active' &&
      status.current !== 'limited' &&
      status.current !== 'blocked'
    ) {
      return false;
    }

    if (
      status.period !== null &&
      (status.period.trim().length <= 0 || typeof status.period !== 'string')
    ) {
      return false;
    }
  }

  if (friends) {
    if (!Array.isArray(friends)) {
      return false;
    }
    const isValid = friends.every((n) => isNumberValid(n));

    if (!isValid) {
      return false;
    }
  }

  if (achievements) {
    if (!Array.isArray(achievements)) {
      return false;
    }
    const isValid = achievements.every((n) => isNumberValid(n));

    if (!isValid) {
      return false;
    }
  }

  return true;
};
