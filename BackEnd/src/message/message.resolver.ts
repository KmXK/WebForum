import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Message)
export class MessageResolver {
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService
    ) {
    }

    @Query(() => [Message], {name: 'messages'})
    findAll() {
        return this.messageService.findAll();
    }

    @Query(() => Message, {name: 'message'})
    findOne(@Args('id') id: string) {
        return this.messageService.findOne(id);
    }

    @ResolveField(() => User)
    author(@Parent() message: Message) {
        return this.userService.findByMessage(message.id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Message)
    async createMessage(
        @CurrentUserId() userId: string,
        @Args('createMessage') createMessageInput: CreateMessageInput,
    ) {
        return this.messageService.addMessage(userId, createMessageInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Message)
    async deleteMessage(
        @CurrentUserId() userId: string,
        @Args('messageId') messageId: string
    ) {
        return this.messageService.deleteMessage(userId, messageId);
    }
}
