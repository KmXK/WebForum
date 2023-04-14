import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.strategy';
import { AppModule } from '../app.module';

@Module({
    imports: [forwardRef(() => AppModule), JwtModule.register({}), PassportModule],
    exports: [AuthService, JwtModule],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy]
})
export class AuthModule {
}
