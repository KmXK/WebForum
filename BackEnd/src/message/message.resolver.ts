import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

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
}
