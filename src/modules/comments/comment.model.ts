import {
  DataType,
  Table,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey,
  Column,
} from 'sequelize-typescript';

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
    type: DataType.STRING,
  })
  content: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  animeId: number;

  @Column({
    type: DataType.INTEGER,
  })
  repliedId: number | null;
}
