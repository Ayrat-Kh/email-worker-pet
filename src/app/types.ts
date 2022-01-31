export type NotifyEmail = {
    jobId: string;
    emailId: string;
};

export type Job = {
    createdAt: string;
    id: string;
    notifyCount: number;
    notifyFailedCount: string;
    notifySuccessCount: string;
};
