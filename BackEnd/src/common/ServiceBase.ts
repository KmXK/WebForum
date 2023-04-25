import { NotFoundException } from '@nestjs/common';

export class ServiceBase {
    protected mapElement(element: any) {
        return {};
    }

    protected map(data: any) {
        if (data === undefined || data === null) {
            throw new NotFoundException();
        }

        if (Array.isArray(data)) {
            return data.map(this.mapElement);
        } else {
            return this.mapElement(data);
        }
    }
}