import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PrismaModule } from '@common/prisma';

@Module({
    providers: [RoleResolver, RoleService],
    imports: [PrismaModule],
    exports: [RoleService]
})
export class RoleModule {
}
