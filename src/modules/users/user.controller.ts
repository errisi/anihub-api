import * as userService from './user.service';

import { Controller } from '../typedefs';
import { isValidUserPostFields } from '../../helpers/isValidUserPostFields';
import { isValidUserPatchFields } from '../../helpers/isValidUserPatchFields';

export const get: Controller = async (req, res) => {
  const users = await userService.findAll();

  if (!users.length) {
    res.sendStatus(404);

    return;
  }

  res.send(users);
};

export const getOne: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const user = await userService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

export const create: Controller = async (req, res) => {
  const { name, password, sex, email, about, age, avatarId } = req.body;

  const users = await userService.findAll();

  const existingUserByName = users.find((user) => user.get('name') === name);
  const existingUserByEmail = users.find((user) => user.get('email') === email);

  if (existingUserByName || existingUserByEmail) {
    res.sendStatus(409);

    return;
  }

  const isUserValid = isValidUserPostFields(
    name,
    email,
    password,
    age,
    sex,
    about,
    avatarId,
  );

  if (!isUserValid) {
    res.sendStatus(422);

    return;
  }

  const newUser = await userService.create(
    name,
    email,
    password,
    age,
    sex,
    about,
    avatarId,
  );

  res.status(201);
  res.send(newUser);
};

export const update: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);
  const {
    name,
    email,
    password,
    age,
    sex,
    about,
    role,
    avatar,
    wallpaper,
    status,
    friends,
    achievements,
  } = req.body;

  const user = userService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const users = await userService.findAll();

  const existingUserByName = users.find((user) => user.get('name') === name);
  const existingUserByEmail = users.find((user) => user.get('email') === email);

  if (existingUserByName || existingUserByEmail) {
    res.sendStatus(409);

    return;
  }

  const isUserValid = isValidUserPatchFields(
    name,
    email,
    password,
    age,
    sex,
    about,
    role,
    avatar,
    wallpaper,
    status,
    friends,
    achievements,
  );

  if (!isUserValid) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.update(id, {
    name,
    email,
    password,
    age,
    sex,
    about,
    role,
    avatar,
    wallpaper,
    status,
    friends,
    achievements,
  });

  res.send(updatedUser);
};

export const remove: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const user = await userService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};
