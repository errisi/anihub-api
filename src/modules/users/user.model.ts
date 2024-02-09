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
  tableName: 'users',
  timestamps: true,
})
export class Users extends Model {
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
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  age: string;

  @Column({
    type: DataType.STRING,
  })
  sex: 'm' | 'f';

  @Column({
    type: DataType.STRING,
  })
  about: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
  })
  role: {
    current: 'user' | 'premium' | 'admin' | 'moderator';
    period: string | null;
  };

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  friends: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  achievements: number[];

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
  })
  wallpaper: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
  })
  status: {
    current: 'active' | 'limited' | 'blocked';
    period: string | null;
  };
}
