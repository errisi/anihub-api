import * as commentsService from './comments.service';
import { Controller } from '../../typedefs';
import { isNumberValid } from '../../helpers/isNumberValid';

export const getAllByAnimeId: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const comments = await commentsService.findAllByAnimeId(id);

  if (!comments.length) {
    return;
  }

  res.send(comments);
};

export const create: Controller = async (req, res) => {
  const { animeId, ownerId, commentId, repliedCommentId, content } = req.body;

  const isCommentValid = () => {
    if (!isNumberValid(animeId) || !isNumberValid(ownerId)) {
      return false;
    }

    if (commentId && !isNumberValid(commentId)) {
      return false;
    }

    if (repliedCommentId && !isNumberValid(repliedCommentId)) {
      return false;
    }

    if (content.trim().length <= 0 || typeof content !== 'string') {
      return false;
    }

    return true;
  };

  if (!isCommentValid) {
    res.sendStatus(422);

    return;
  }

  const newComment = await commentsService.create(
    animeId,
    ownerId,
    content,
    commentId,
    repliedCommentId,
  );

  res.status(201);
  res.send(newComment);
};

export const update: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);
  const { content } = req.body;

  const comment = await commentsService.findById(id);

  if (!comment) {
    res.sendStatus(404);

    return;
  }

  if (content.trim().length <= 0 || typeof content !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedComment = await commentsService.update(id, content);

  res.send(updatedComment);
};

export const remove: Controller = async (req, res) => {
  const { id: idParams } = req.params;
  const id = Number(idParams);

  const comment = await commentsService.findById(id);

  if (!comment) {
    res.sendStatus(404);

    return;
  }

  commentsService.remove(id);

  res.sendStatus(204);
};
