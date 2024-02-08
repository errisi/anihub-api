import * as userService from './user.service';

import { Controller } from '../typedefs';
import { isNumberValid } from '../../helpers/isNumberValid';

export const get: Controller = async (req, res) => {
  const users = await userService.findAll();

  if (!users.length) {
    res.sendStatus(404);

    return;
  }

  res.send(users);
};

export const getOne: Controller = async (req, res) => {
  const id = Number(req.query.id);

  if (isNumberValid(id)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};
