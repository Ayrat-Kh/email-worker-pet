import express, { Request, Response } from 'express';
import next from 'next';
import http from 'http';

import { initIO, getIO } from './services/io-client';
import { initKafkaConsumer } from './services/kafka-consumer';
import scheduleEmailHandler, { EMAIL_SCHEDULE_URL } from './api/schedule-email';
import { registerListeners } from './services/io-listeners';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    const app = express();
    const server = http.createServer(app);

    app.use(express.json());

    app.post(EMAIL_SCHEDULE_URL, async (req: Request, res: Response) => {
        console.log('handling request');
        await scheduleEmailHandler(req, res);
    });
    app.all('*', (req: Request, res: Response) => {
        return nextHandler(req, res);
    });

    initIO(server);

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });

    registerListeners(getIO());
    await initKafkaConsumer();
});
