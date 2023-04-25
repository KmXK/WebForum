import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '@common/prisma';
import { RoleModule } from '../role/role.module';

@Module({
    providers: [UserResolver, UserService],
    exports: [UserService],
    imports: [PrismaModule, RoleModule]
})
export class UserModule {
}
