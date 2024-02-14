import { Sequelize } from 'sequelize-typescript';
import { Users } from './modules/users/user.model';
import { Collentions } from './modules/collections/collection.model';
import { Comments } from './modules/comments/comment.model';
import { Tokens } from './modules/token/token.model';
import { Notifications } from './modules/notifications/notifications.model';

export const connectToDb = async () => {
  const DB_NAME = process.env.DB_NAME;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;

  const DB_URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  const sequelize = new Sequelize(DB_URI, {
    models: [Users, Collentions, Comments, Tokens, Notifications],
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });

  Tokens.belongsTo(Users, { foreignKey: 'userId' });
  Users.hasOne(Tokens, { foreignKey: 'userId' });

  try {
    await sequelize.authenticate();

    console.log('Successfully connected to DB');
  } catch (e) {
    console.error('Failed to connect to DB', e);

    throw e;
  }

  return sequelize;
};
