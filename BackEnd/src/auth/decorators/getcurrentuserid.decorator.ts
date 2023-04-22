import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadDto } from '../dto/payload.dto';

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        const payload = request.payload as PayloadDto;
        return payload.userId;
    }
);
