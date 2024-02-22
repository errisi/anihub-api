import {
  DataType,
  Table,
  Model,
  AutoIncrement,
  AllowNull,
  PrimaryKey,
  Column,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'collentions',
  timestamps: true,
})
export class Collentions extends Model {
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
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  animeIds: number[];
}
