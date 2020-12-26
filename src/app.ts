import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import security from './security/security';
import csrfMiddleware from './security/csrf/csrf.middleware';
import securityRouter from './security/security.router';
import appRouter from './app.router';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(security.initialize());
app.use(security.session());
app.use(security.authenticate('remember-me'));
app.use(csurf());

app.use(csrfMiddleware);
app.use('/api/security', securityRouter);
app.use(appRouter);

export default app;
