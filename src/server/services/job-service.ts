import { PrismaClient, Job, JobDetail } from '@prisma/client';

const prismaClient = new PrismaClient();

export const getJob = async (id: string) =>
    await prismaClient.job.findFirst({
        where: { id },
    });

export const getJobs = async () =>
    await prismaClient.job.findMany({ orderBy: { createdAt: 'desc' } });

export const createJob = async (notifyCount: number) => {
    return await prismaClient.job.create({
        data: {
            notifyCount,
            notifySuccessCount: 0,
            notifyFailedCount: 0,
        },
    });
};

export const saveSucceedJob = async (
    jobId: string,
    emailId: string
): Promise<{
    job: Job;
    jobDetail: JobDetail;
}> => {
    // if operation succeed then increment notifySuccessCount, and add details
    const [job, jobDetail] = await prismaClient.$transaction([
        prismaClient.job.update({
            where: { id: jobId },
            data: { notifySuccessCount: { increment: 1 } },
        }),
        prismaClient.jobDetail.create({
            data: {
                jobId,
                detail: { succeded: true, emailId },
            },
        }),
    ]);
    return { job, jobDetail };
};

export const saveFailedJob = async (
    jobId: string,
    emailId: string
): Promise<{
    job: Job;
    jobDetail: JobDetail;
}> => {
    // if operation succeed then increment notifySuccessCount, and add details
    const [job, jobDetail] = await prismaClient.$transaction([
        prismaClient.job.update({
            where: { id: jobId },
            data: { notifyFailedCount: { increment: 1 } },
        }),
        prismaClient.jobDetail.create({
            data: {
                jobId,
                detail: { succeded: false, emailId },
            },
        }),
    ]);
    return { job, jobDetail };
};
