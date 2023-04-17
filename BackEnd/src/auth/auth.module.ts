import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule, PrismaService } from '@common/prisma';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule, PrismaModule],
    exports: [AuthService],
    providers: [PrismaService]
})
export class AuthModule {
}
