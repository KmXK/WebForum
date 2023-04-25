import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
