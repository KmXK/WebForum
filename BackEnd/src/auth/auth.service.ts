import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { PasswordHashingService } from '@common/password-hashing';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private passwordHashingPassword: PasswordHashingService) {
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                login: signInDto.login
            },
            include: {
                role: true
            }
        });

        if (user === null) {
            throw new NotFoundException('Invalid login or password');
        }

        const passwordsEquals = this.passwordHashingPassword.verifyPassword(
            signInDto.password,
            user.passwordHash,
            user.passwordSalt);

        if (!passwordsEquals) {
            throw new NotFoundException('Invalid login or password');
        }

        const data = await this.generateTokens(user);

        const rtHash = await this.generateHash(data.refreshToken);
        await this.prismaService.user.update({
            where: {id: user.id},
            data: {refreshToken: rtHash}
        });

        return data;
    }

    async signOut(userId: string) {
        await this.prismaService.user.update({
            where: {id: userId},
            data: {refreshToken: null}
        });
    }

    async refreshTokens(token: string) {
        if (!token) throw new UnauthorizedException();

        const payload = this.jwtService.verify<PayloadDto>(token,
            {
                secret: process.env.RT_SECRET
            });

        if (!payload) throw new UnauthorizedException();

        const user = await this.prismaService.user.findUnique({
            where: {id: payload.userId},
            include: {role: true}
        });

        if (user === null
            || user.refreshToken === null
            || !(await bcrypt.compare(token, user.refreshToken))) {
            throw new UnauthorizedException();
        }

        const data = await this.generateTokens(user);
        const rtHash = await this.generateHash(data.refreshToken);

        await this.prismaService.user.update({
            where: {id: user.id},
            data: {refreshToken: rtHash}
        });

        return data;
    }

    private async generateTokens(user: User & { role: Role }) {
        const payload: PayloadDto = {
            userId: user.id,
            role: user.role.name
        };

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
