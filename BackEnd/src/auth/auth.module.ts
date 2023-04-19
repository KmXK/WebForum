import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@common/prisma';
import { AuthService } from './auth.service';
import { CommonModule } from '@common/common.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [JwtModule, PrismaModule, CommonModule],
    exports: [AuthService],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
