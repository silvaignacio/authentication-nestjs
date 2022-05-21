import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  username: string;

  @Column
  password: string;
}
