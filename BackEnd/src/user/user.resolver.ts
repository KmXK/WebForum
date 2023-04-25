import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService
    ) {
    }

    @Query(() => User, {name: 'user'})
    findOne(@Args('id') id: string) {
        return this.userService.findOne(id);
    }

    @ResolveField(() => Role)
    async role(@Parent() user: User) {
        return this.roleService.findOne(user.roleId);
    }
}
