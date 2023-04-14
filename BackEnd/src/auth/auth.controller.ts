import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    async login(@Body() userDto: AuthDto, @Res({passthrough: true}) response: Response) {
        const {accessToken, refreshToken, data} = await this.authService.login(userDto);
        response.cookie('jwt', refreshToken, {httpOnly: true});
        return {accessToken, user: data};
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        await this.authService.logout();
        response.cookie('jwt', '', {httpOnly: true});
    }

    @Post('refresh')
    async refresh(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        const {accessToken, refreshToken, data} = await this.authService.refreshTokens(
            request.cookies['jwt']
        );
        response.cookie('jwt', refreshToken, {httpOnly: true});
        return {accessToken, user: data};
    }
}
