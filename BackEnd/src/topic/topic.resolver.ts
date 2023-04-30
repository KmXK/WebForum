import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Topic } from './entities/topic.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { CreateTopicInput } from './dto/create-topic.input';

@Resolver(() => Topic)
export class TopicResolver {
    constructor(
        private readonly topicService: TopicService,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {
    }

    @Query(() => [Topic], {name: 'topics'})
    findAll() {
        return this.topicService.findAll();
    }

    @Query(() => Topic, {name: 'topic'})
    findOne(@Args('id') id: string) {
        return this.topicService.findOne(id);
    }

    @ResolveField(() => User)
    author(@Parent() topic: Topic) {
        return this.userService.findOne(topic.authorId);
    }

    @ResolveField(() => [Message])
    messages(@Parent() topic: Topic) {
        return this.messageService.getTopicMessages(topic.id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Topic)
    async createTopic(
        @CurrentUserId() userId: string,
        @Args('createTopicInput') createTopicInput: CreateTopicInput
    ) {
        return this.topicService.createTopic(userId, createTopicInput);
    }
}
