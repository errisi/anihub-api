import { Controller } from '../typedefs';
import * as NotificationsService from '../services/notifications.service';

export const getByUserId: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const notifications = await NotificationsService.findByUserId(id);

  if (!notifications) {
    return;
  }

  res.send(notifications);
};

export const postByUserId: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);
  const { content } = req.body;

  const notification = await NotificationsService.create(id, content);

  if (!notification) {
    res.sendStatus(500);

    return;
  }

  res.send(notification);
};

export const postForAll: Controller = async (req, res) => {
  const { content } = req.body;

  const notifications = await NotificationsService.createForAll(content);

  if (!notifications) {
    res.sendStatus(500);

    return;
  }

  res.send(notifications);
};

export const update: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const updatedNotifications = await NotificationsService.toggleStatus(id);

  if (!updatedNotifications) {
    return;
  }

  res.send(updatedNotifications);
};
