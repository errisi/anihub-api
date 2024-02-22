import {
  DataType,
  Table,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './user.model';

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comments extends Model {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  animeId: number;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @Column({
    type: DataType.INTEGER,
  })
  commentId: number | null;

  @Column({
    type: DataType.INTEGER,
  })
  repliedCommentId: number | null;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  content: string;
}
