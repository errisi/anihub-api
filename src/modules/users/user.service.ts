import { ApiError } from '../../exeptions/api.error';
import { Users } from './user.model';

export const findAll = async () => {
  const users = await Users.findAll();

  return users;
};

export const normalize = ({
  id,
  name,
  email,
  age,
  sex,
  about,
  role,
  friends,
  achievements,
  avatar,
  wallpaper,
  status,
  activationToken,
}: Partial<Users>) => {
  return {
    id,
    name,
    email,
    age,
    sex,
    about,
    role,
    friends,
    achievements,
    avatar,
    wallpaper,
    status,
    activationToken,
  };
};

export const findByEmail = (email: string) => {
  return Users.findOne({ where: { email } });
};

export const findById = (id: number) => Users.findByPk(id);

export const create = async (
  name: string,
  email: string,
  password: string,
  activationToken: string,
  age?: number | null,
  sex?: 'm' | 'f' | null,
  about?: string | null,
  avatar?: string | null,
) => {
  const existingUserByName = await Users.findOne({ where: { name } });

  if (existingUserByName) {
    throw ApiError.alreadyExist('User alredy exist', {
      name: 'name alredy exist',
    });
  }

  const existingUserByEmail = await Users.findOne({ where: { email } });

  if (existingUserByEmail) {
    throw ApiError.alreadyExist('User alredy exist', {
      email: 'User alredy exist',
    });
  }

  const filteredValues = {
    name,
    email,
    password,
    activationToken,
    age,
    sex,
    about,
    avatar,
  };

  const validValues = Object.fromEntries(
    Object.entries(filteredValues).filter(([, v]) => v),
  );

  const newUser = await Users.create({
    ...validValues,
    role: {
      current: 'user',
      period: null,
    },
    status: {
      current: 'active',
      period: null,
    },
  });

  return newUser;
};

export const update = async (id: number, values: Partial<Users>) => {
  const validValues = Object.fromEntries(
    Object.entries(values).filter(([, v]) => v),
  );

  const updatedUser = await Users.update(
    {
      ...validValues,
    },
    {
      where: { id },
      returning: true,
    },
  );

  return updatedUser;
};

export const remove = (id: number) => {
  Users.destroy({
    where: {
      id,
    },
  });
};
