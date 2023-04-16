import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports: [PrismaModule],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule {
}