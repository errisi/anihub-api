import { Users } from '../users/user.model';
import { Notifications } from './notifications.model';
import { Op } from 'sequelize';

export const findByUserId = async (userId: number) => {
  const notifications = await Notifications.findAll({
    where: {
      userId,
    },
  });

  return notifications;
};

export const create = async (userId: number, content: string) => {
  const newNotification = await Notifications.create({
    content,
    status: 'not viewed',
    userId,
  });

  return newNotification;
};

export const createForAll = async (content: string) => {
  const users = await Users.findAll();

  const notifications = users.map((user) => ({
    content,
    status: 'not viewed',
    userId: user.id,
  }));

  return Notifications.bulkCreate(notifications);
};

export const toggleStatus = async (userId: number) => {
  const updatedNotification = await Notifications.update(
    {
      status: 'viewed',
    },
    {
      where: {
        [Op.and]: [{ userId }, { status: 'not viewed' }],
      },
      returning: true,
    },
  );

  return updatedNotification;
};
