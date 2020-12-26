import passport from 'passport';
import User from './users/user.model';
import UserStrategy from './users/user.strategy';
import RememberMeStrategy from './remember-me/remember-me.strategy';

passport.use(UserStrategy);
passport.use(RememberMeStrategy);

passport.serializeUser((user: User, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    const user = await User.findByPk(id);

    if (!user || !user.enabled) {
        return done(null, false);
    }

    return done(null, user.id);
});

const security = passport;

export default security;
