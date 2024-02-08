import { Users } from './user.model';

export const findAll = () => Users.findAll();

export const findById = (id: number) => Users.findByPk(id);
