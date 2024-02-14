import { Controller } from '../../typedefs';
import * as NotificationsService from './notifications.service';

export const getByUserId: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const notifications = await NotificationsService.findByUserId(id);

  if (!notifications) {
    return;
  }

  res.send(notifications);
};
