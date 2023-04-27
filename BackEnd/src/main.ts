import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from '@common/prisma';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors();

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.setGlobalPrefix('/api');

    await app.listen(3000);
}

bootstrap();
