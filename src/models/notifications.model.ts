import {
  DataType,
  Table,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey,
  Column,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './user.model';

@Table({
  tableName: 'notifications',
  timestamps: true,
})
export class Notifications extends Model {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  status: 'viewed' | 'not viewed';

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
