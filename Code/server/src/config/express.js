import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { log } from 'console';
import router from '../routes';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// Remove No Cache Control
app.disable('etag');

// Routes
app.use('/', router);

// Error handler
app.use((error, req, res) => {
    if (res.headersSent)
        log(error, 'Handled error');
    console.log(req.status(500).send);
    return req.status(500).send(error.message);
});

app.listen(process.env.SERVER_PORT, () => {
    log(`[Express] Api is running on ${process.env.SERVER_PORT}`);
});
