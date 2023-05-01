import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

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

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateUser(
        @CurrentUserId() userId: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return this.userService.update(userId, updateUserInput);
    }
}
