import { Tokens } from './token.model';

async function save(userId: number, newToken: string) {
  const token = await Tokens.findOne({ where: { userId } });

  if (!token) {
    await Tokens.create({ userId, refreshToken: newToken });

    return;
  }

  token.refreshToken = newToken;

  await token.save();
}

function getByToken(refreshToken: string) {
  return Tokens.findOne({ where: { refreshToken } });
}

function remove(userId: number) {
  return Tokens.destroy({ where: { userId } });
}

export const tokenService = {
  save,
  getByToken,
  remove,
};
