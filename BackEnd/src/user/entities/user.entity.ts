import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../role/entities/role.entity';

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    login: string;

    @Field({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    lastName?: string;

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    avatarUrl?: string;

    roleId: number;

    @Field(() => Role)
    roleName: Role;
}
