import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, PayloadUserDto } from './dto/auth.dto';
import { UserService } from '../services/user.service';
import { verifyPassword } from '../common/password-hashing';
import * as bcrypt from 'bcrypt'
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async login(userDto: AuthDto) {
        const user = await this.userService.getUserBy({
            login: userDto.email
        });

        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        const result = verifyPassword(userDto.password, user.passwordHash, user.passwordSalt);
        console.log(result)

        if (!result) {
            throw new UnauthorizedException({
                message: 'Not valid Password'
            });
        }

        const data = await this.generateTokens(user);

        const rtHash = await this.generateHash(data.refreshToken);
        await this.userService.updateUser({
            where: {id: user.id},
            data: {rt: rtHash}
        });

        return data;
    }

    async logout() {
        await this.userService.updateUser({
            where: {login: 'admin'},
            data: {rt: null}
        });
    }

    async refreshTokens(token: string) {
        if (!token) throw new UnauthorizedException();

        const userData: PayloadUserDto = this.validateRefreshToken(token);
        if (!userData) throw new UnauthorizedException();

        const user = await this.userService.getUserBy({id: userData.id});

        if (user === null || user.rt === null) throw new UnauthorizedException();

        if (await bcrypt.compare(user.rt, token)) throw new UnauthorizedException();

        const data = await this.generateTokens(user);
        const rtHash = await this.generateHash(data.refreshToken);
        await this.userService.updateUser({
            where: {id: user.id},
            data: {rt: rtHash}
        });

        return data;
    }

    validateRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {secret: process.env.RT_SECRET});
        } catch (error: any) {
            return null;
        }
    }

    async generateTokens(
        user: User & {
            role: Role;
        }
    ) {
        const payload = {...new PayloadUserDto(user)};

        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: 15 * 60,
                secret: process.env.AT_SECRET
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: process.env.RT_SECRET
            }),
            data: payload
        };
    }

    private async generateHash(data: string) {
        return await bcrypt.hash(data, 5);
    }
}
