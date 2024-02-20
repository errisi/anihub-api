import { Comments } from './comments.model';
import * as userService from '../users/user.service';

export const findById = (id: number) => Comments.findByPk(id);

export const findAllByAnimeId = async (animeId: number) => {
  const commentsFromDb = await Comments.findAll({
    where: {
      animeId,
    },
  });

  const comments = await Promise.all(
    commentsFromDb.map(async (comment) => {
      const user = await userService.findById(comment.ownerId);

      const newComment = {
        comment: comment.dataValues,
        user,
      };

      console.log(newComment);

      return newComment;
    }),
  );

  return comments;
};

export const create = async (
  animeId: number,
  ownerId: number,
  content: string,
  commentId?: number,
  repliedCommentId?: number,
) => {
  const newComment = await Comments.create({
    animeId,
    ownerId,
    content,
    commentId: commentId ? commentId : null,
    repliedCommentId: repliedCommentId ? repliedCommentId : null,
  });

  return newComment;
};

export const update = async (id: number, content: string) => {
  const updatedComment = await Comments.update(
    {
      content,
    },
    {
      where: { id },
      returning: true,
    },
  );

  return updatedComment;
};

export const remove = (id: number) => {
  Comments.destroy({
    where: {
      id,
    },
  });
};
