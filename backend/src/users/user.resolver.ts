import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.create({
      email,
      password,
    });
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
