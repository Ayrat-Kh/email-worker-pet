import { getKafka, KafkaTopics, sendToQueue } from './kafka-client';
import { getIO } from './io-client';

import { NotifyEmail } from 'app/types';
import {
    createJob,
    getJob,
    getJobs,
    saveFailedJob,
    saveSucceedJob,
} from './job-service';
import { Job } from '@prisma/client';

import { AppEvents } from '../../app/events';

const kafka = getKafka();

export const startEmailJob = async (notifyCount: number): Promise<Job> => {
    const job = await createJob(notifyCount);

    const jobs = await getJobs();
    getIO().emit(AppEvents.JobUpdated, jobs);

    await sendToQueue(
        createBatchEmailMessages(job.id, notifyCount),
        kafka.producer(),
        KafkaTopics.HandleJob
    );

    return job;
};

export const handleEmailJob = async (jobId: string, emailId: string) => {
    if (!jobId) {
        throw new Error(`Jobid is null`);
    }

    const job = await getJob(jobId);

    if (!job) {
        throw new Error(`Job with id: ${jobId} not found`);
    }

    // imitate email sending work
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                const fn = Math.random() < 0.8 ? resolve : reject;
                fn();
            }, 200);
        });

        // if operation succeed then increment notifySuccessCount, and add details
        await saveSucceedJob(jobId, emailId);
        // updatedJob = job;
    } catch (error) {
        // otherwise increment notifyFailedCount, and add error details
        await saveFailedJob(jobId, emailId);
    }

    const jobs = await getJobs();
    getIO().emit(AppEvents.JobUpdated, jobs);
};

const createBatchEmailMessages = (jobId: string, notifyCount: number) =>
    Array.from(new Array(notifyCount)).map((_, index) =>
        createEmailMessage(jobId, `${index}`)
    );

const createEmailMessage = (jobId: string, emailId: string): NotifyEmail => ({
    jobId,
    emailId,
});

export default () => startEmailJob;
