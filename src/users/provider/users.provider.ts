import { Users } from '../domain/users.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
