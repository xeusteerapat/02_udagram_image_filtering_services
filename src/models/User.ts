import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
  })
  public id: string;

  @PrimaryKey
  @Column
  public email!: string;

  @Column
  public password!: string;

  @Column
  public fullname!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();

  short() {
    return {
      email: this.email,
    };
  }
}
