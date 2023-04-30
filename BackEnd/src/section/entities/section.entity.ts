import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from '../../user/entities/user.entity';


@ObjectType()
export class Section {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    creationTime: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => [Topic])
    topics: Topic[];

    @Field(() => [Section])
    children: Section[];

    @Field(() => User)
    author: User;
}
