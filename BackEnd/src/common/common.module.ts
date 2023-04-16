import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { PasswordHashingService } from '@common/password-hashing';

@Module({
    imports: [PrismaModule],
    exports: [PrismaModule, PasswordHashingService],
    providers: [PasswordHashingService]
})
export class CommonModule {
}
