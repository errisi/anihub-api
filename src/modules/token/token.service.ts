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

export const tokenService = {
  save,
  getByToken,
};
