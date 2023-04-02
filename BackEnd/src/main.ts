import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/base/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app)
    app.setGlobalPrefix('/api')

    await app.listen(3000);
}

bootstrap();
