import { Users } from './user.model';

export const findAll = async () => {
  const users = await Users.findAll();

  return users;
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
  avatarId?: number | null,
) => {
  const filteredValues = {
    name,
    email,
    password,
    activationToken,
    age,
    sex,
    about,
    avatarId,
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
