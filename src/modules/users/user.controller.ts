import * as userService from './user.service';

import { Controller } from '../../typedefs';
import { isValidUserPostFields } from '../../helpers/isValidUserPostFields';
import { isValidUserPatchFields } from '../../helpers/isValidUserPatchFields';
import { emailService } from '../email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { Users } from './user.model';
import { jwtService } from '../jwt/jwt.service';
import { ApiError } from '../../exeptions/api.error';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { tokenService } from '../token/token.service';
import { s3Upload } from '../s3/s3.service';
import { v4 as uuid } from 'uuid';

export const get: Controller = async (req, res) => {
  const users = await userService.findAll();

  if (!users.length) {
    res.sendStatus(404);

    return;
  }

  res.send(users.map(userService.normalize));
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
  const { name, password, sex, email, about, age, avatar } = req.body;

  const isUserValid = isValidUserPostFields(
    name,
    email,
    password,
    age,
    sex,
    about,
    avatar,
  );

  if (!isUserValid) {
    res.sendStatus(422);

    return;
  }

  const activationToken = uuidv4();
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await userService.create(
    name,
    email,
    hashedPass,
    activationToken,
    age,
    sex,
    about,
    avatar,
  );

  await emailService.sendActivationEmail(email, activationToken);

  res.status(201);
  res.send(newUser);
};

export const activate: Controller = async (req, res) => {
  const { activationToken } = req.params;
  const user = await Users.findOne({ where: { activationToken } });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.activationToken = null;
  user.save();

  res.send(user);
};

export const login: Controller = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.badRequest('No such user', {});
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.badRequest('Wrong password', {});
  }

  await generateTokens(res, user);
};

export const refresh: Controller = async (req, res) => {
  const { refreshToken } = req.cookies;

  const user = jwtService.verifyRefresh(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!user || !token) {
    throw ApiError.unauthorized({});
  }

  await generateTokens(res, user as Users);
};

export const generateTokens = async (res: Response, user: Users) => {
  const normalizedUser = userService.normalize(user);

  const accessToken = jwtService.sign(normalizedUser);
  const refreshToken = jwtService.signRefresh(normalizedUser);

  if (typeof normalizedUser.id !== 'number') {
    throw ApiError.badRequest('id is NaN', {});
  }

  await tokenService.save(normalizedUser.id!, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({
    user: normalizedUser,
    accessToken,
  });
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

  if (name) {
    const existingUserByName = await Users.findOne({ where: { name } });

    if (existingUserByName) {
      res.sendStatus(409);

      return;
    }
  }

  if (email) {
    const existingUserByEmail = await Users.findOne({ where: { email } });

    if (existingUserByEmail) {
      res.sendStatus(409);

      return;
    }
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

const updateUserImage = async (
  req: Request,
  res: Response,
  field: 'avatar' | 'wallpaper',
) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const user = await userService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No file uploaded' });
  }

  const image = files[0];

  const currentUuid = uuid();

  const result = await s3Upload(image, currentUuid);

  switch (field) {
    case 'avatar':
      user.avatar =
        `https://anihub-s3-images.s3.eu-north-1.amazonaws.com/images/${currentUuid}-${image.originalname}`!;
      break;
    case 'wallpaper':
      user.wallpaper = `https://anihub-s3-images.s3.eu-north-1.amazonaws.com/images/${currentUuid}-${image.originalname}`;
      break;
    default:
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid field' });
  }

  await user.save();

  res.json({ status: 'success', result });
};

export const updateAvatar: Controller = async (req, res) => {
  updateUserImage(req, res, 'avatar');
};

export const updateWallpaper: Controller = async (req, res) => {
  updateUserImage(req, res, 'wallpaper');
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

export const logout: Controller = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await jwtService.verifyRefresh(refreshToken);

  const user = userData as Users;

  if (!user || !refreshToken) {
    throw ApiError.unauthorized({});
  }

  await tokenService.remove(user.id);

  res.sendStatus(204);
};
