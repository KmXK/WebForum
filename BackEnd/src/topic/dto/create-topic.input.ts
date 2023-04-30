import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTopicInput {
    @Field()
    name: string;

    @Field(() => Int)
    sectionId: number;

    @Field()
    isImportant: boolean;

    @Field()
    messageText: string;
}