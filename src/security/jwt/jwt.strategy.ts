import { Strategy } from 'passport-jwt';
import config from '../../core/config';

const { secret } = config;

const JWTStrategy = new Strategy({
    secretOrKey: secret,
    algorithms: ['HS256'],
    jwtFromRequest(req) {
        const { jwt } = req.cookies;
        const { authorization } = req.headers;

        if (jwt) {
            return jwt;
        }

        if (authorization && authorization.startsWith('Bearer: ')) {
            return authorization.replace('Bearer: ', '');
        }

        return null;
    },
}, (payload, done) => {
    const { username, role } = payload;
    return done(null, { username, role });
});

export default JWTStrategy;
