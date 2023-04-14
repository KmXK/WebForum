import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/common/prisma.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app)
    app.setGlobalPrefix('/api')

    await app.listen(3000);
}

bootstrap();
