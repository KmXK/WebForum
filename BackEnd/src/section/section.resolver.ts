import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { Topic } from '../topic/entities/topic.entity';
import { TopicService } from '../topic/topic.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateSectionInput } from './dto/create-section.input';
import { CurrentUserId } from '../auth/decorators/getcurrentuserid.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Section)
export class SectionResolver {
    constructor(
        private readonly sectionService: SectionService,
        private readonly topicService: TopicService,
        private readonly userService: UserService
    ) {
    }

    @Query(() => [Section], {name: 'sections'})
    findAll() {
        return this.sectionService.findAll();
    }

    @Query(() => Section, {name: 'section'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.sectionService.findOne(id);
    }

    @ResolveField(() => [Topic])
    topics(@Parent() section: Section) {
        return this.topicService.findBySection(section.id);
    }

    @ResolveField(() => [Section])
    children(@Parent() section: Section) {
        return this.sectionService.findChildren(section.id);
    }

    @ResolveField(() => User)
    author(@Parent() section: Section) {
        return this.userService.findBySection(section.id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Section, {name: 'createSection'})
    createSection(
        @CurrentUserId() userId: string,
        @Args('input') input: CreateSectionInput
    ) {
        return this.sectionService.createSection(userId, input)
    }
}
