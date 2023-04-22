import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TopicGateway implements OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    @SubscribeMessage('topic')
    topic(
        @MessageBody() data: { topicId: string },
        @ConnectedSocket() client: Socket
    ) {
        const rooms = Array.from(client.rooms);

        if (rooms.includes(data.topicId)) {
            client.leave(data.topicId);
        } else {
            client.join(data.topicId);
        }
    }

    addMessage(
        {topicId, messageId}: { topicId: string, messageId: string }
    ) {
        this.server.to(topicId).emit('topic/message/add', messageId);
    }

    handleDisconnect(client: Socket) {
        client.rooms.forEach(r => client.leave(r));
    }
}