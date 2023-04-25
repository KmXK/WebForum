import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { Topic } from '../topic/entities/topic.entity';
import { TopicService } from '../topic/topic.service';

@Resolver(() => Section)
export class SectionResolver {
    constructor(
        private readonly sectionService: SectionService,
        private readonly topicService: TopicService
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
}
