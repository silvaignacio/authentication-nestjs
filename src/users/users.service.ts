import { Inject, Injectable } from '@nestjs/common';
import { Users } from './domain/users.entity';
import * as bcrypt from 'bcrypt';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
  ) {}

  async findOne(username: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async registerUser(user: Users): Promise<Users> {
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return Users.build({
      username: user.username,
      password: hash,
    }).save();
  }
}
