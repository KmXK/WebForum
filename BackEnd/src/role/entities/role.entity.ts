import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleType } from '@shared/enums';

@ObjectType()
export class Role {
    @Field(() => Int)
    id: RoleType;

    @Field()
    name: string;
}
