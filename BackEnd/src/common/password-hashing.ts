import * as crypto from 'crypto';

export const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(64);
    const hash = crypto.createHmac('sha512', salt).update(password).digest();
    return {
        hash,
        salt
    };
};

export const verifyPassword = (password: string, hash: Buffer, salt: Buffer) => {
    const currentHash = crypto.createHmac('sha512', salt).update(password).digest();
    console.log(hash);
    console.log(currentHash)
    return currentHash.compare(hash) === 0;
};
