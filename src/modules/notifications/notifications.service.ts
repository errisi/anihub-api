import { Notifications } from './notifications.model';
import { Op } from 'sequelize';

export const findByUserId = async (userId: number) => {
  const notifications = await Notifications.findAll({
    where: {
      [Op.or]: [{ userId }, { userId: null }],
    },
  });

  return notifications;
};
