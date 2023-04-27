import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@common/prisma';
import { AuthService } from './auth.service';
import { CommonModule } from '@common/common.module';
import { AuthController } from './auth.controller';
import { AtStrategy } from './strategies/at.strategy';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
    imports: [JwtModule.register({global: true}), PrismaModule, CommonModule],
    exports: [AuthService, GqlAuthGuard],
    providers: [AuthService, AtStrategy, GqlAuthGuard],
    controllers: [AuthController]
})
export class AuthModule {
}
