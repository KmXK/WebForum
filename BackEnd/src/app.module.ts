import { Module } from '@nestjs/common';
import { PrismaService } from './services/common/prisma.service';

@Module({
    providers: [
        PrismaService
    ]
})
export class AppModule {
}
