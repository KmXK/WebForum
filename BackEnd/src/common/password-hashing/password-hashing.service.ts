import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordHashingService {
    hashPassword(password: string) {
        const salt = crypto.randomBytes(64);
        const hash = crypto.createHmac('sha512', salt).update(password).digest();
        return {
            hash,
            salt
        };
    }

    verifyPassword(password: string, hash: Buffer, salt: Buffer) {
        const currentHash = crypto.createHmac('sha512', salt).update(password).digest();
        return currentHash.compare(hash) === 0;
    }
}
