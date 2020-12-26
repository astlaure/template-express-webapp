import jwt from 'jsonwebtoken';
import config from '../../core/config';

const { secret } = config;

const encode = async (claims: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(claims, secret, {
                algorithm: 'HS256',
            });
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
}

const decode = async (token: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        try {
            const claims = jwt.verify(token, secret, {
                algorithms: ['HS256'],
            });
            resolve(claims);
        } catch (err) {
            reject(err);
        }
    });
}

const jwtUtil = {
    encode,
    decode,
}

export default jwtUtil;
