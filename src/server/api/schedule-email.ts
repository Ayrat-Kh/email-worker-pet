import { Request, Response } from 'express';
import { startEmailJob } from '../services/email-schedule';

export default async (req: Request, res: Response) => {
    if (!req.body.notifyCount) {
        return res.status(400).send({
            message: 'Missed notifyCount field',
        });
    }

    const job = await startEmailJob(req.body.notifyCount);

    res.status(200).json(job);
};

export const EMAIL_SCHEDULE_URL = '/api/schedule-email';
