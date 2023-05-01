import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field({nullable: true})
    login?: string;

    @Field({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    lastName?: string;
}