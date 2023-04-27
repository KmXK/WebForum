import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Message {
    @Field()
    id: string;

    authorId: string;

    @Field(() => User)
    author: User;

    @Field()
    text: string;

    @Field(() => String)
    creationTime: string;

    @Field()
    isDeleted: boolean;
}
