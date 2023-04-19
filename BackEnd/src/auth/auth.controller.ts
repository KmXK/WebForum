import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { GetCurrentUserId } from './decorators/getcurrentuserid.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    async login(
        @Body() userDto: SignInDto,
        @Res({passthrough: true}) response: Response
    ) {
        const {accessToken, refreshToken, data} = await this.authService.signIn(userDto);
        response.cookie('rt_jwt', refreshToken, {httpOnly: true});
        return {accessToken, user: data};
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res({passthrough: true}) response: Response,
        @GetCurrentUserId() userId: string
    ) {
        await this.authService.signOut(userId);
        response.cookie('rt_jwt', '', {httpOnly: true});
    }

    @Post('refresh')
    async refresh(
        @Req() request: Request,
        @Res({passthrough: true}) response: Response
    ) {
        const {accessToken, refreshToken, data} = await this.authService.refreshTokens(
            request.cookies['rt_jwt']
        );
        response.cookie('rt_jwt', refreshToken, {httpOnly: true});
        return {accessToken, user: data};
    }
}
