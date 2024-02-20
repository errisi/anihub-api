import { Users } from '../users/user.model';
import { Comments } from './comments.model';

export const findById = (id: number) => Comments.findByPk(id);

export const findAllByAnimeId = async (animeId: number) => {
  const commentsFromDb = await Comments.findAll({
    where: {
      animeId,
    },
  });

  const comments = commentsFromDb.map((comment) => {
    const user = Users.findByPk(comment.ownerId);

    return {
      ...comment,
      user,
    };
  });

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
