import { Strategy } from 'passport-local';
import User from './user.model';
import bcryptUtil from '../bcrypt/bcrypt.util';

const UserStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true,
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !await bcryptUtil.decode(password, user.password)) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

export default UserStrategy;
