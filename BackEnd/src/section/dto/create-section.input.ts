import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => Int, {nullable: true})
    parentSectionId?: number;
}