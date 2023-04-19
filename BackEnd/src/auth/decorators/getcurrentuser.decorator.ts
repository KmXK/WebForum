import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadDto } from '../dto/payload.dto';

export const GetCurrentUser = createParamDecorator(
    (data: keyof PayloadDto | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
);
