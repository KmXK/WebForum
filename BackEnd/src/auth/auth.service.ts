import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {
    }

    async signIn(signInDto: SignInDto) {
        
    }
}
