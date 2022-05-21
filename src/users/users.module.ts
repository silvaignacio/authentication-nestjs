import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { databaseProviders } from '../shared/database.provider';
import { usersProvider } from './provider/users.provider';

@Module({
  providers: [...databaseProviders, UsersService, ...usersProvider],
  exports: [...databaseProviders, UsersService],
})
export class UsersModule {}
