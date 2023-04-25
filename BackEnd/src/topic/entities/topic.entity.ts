import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/message/entities/message.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Topic {
    @Field()
    id: string;

    @Field()
    name: string;

    authorId: string;

    @Field(() => User)
    author: User;

    @Field(() => [Message])
    messages: Message[];
}
