import { Job } from 'app/types';

export const scheduleJob = async (notifyCount: number): Promise<Job> => {
    const rawResponse = await fetch('/api/schedule-email', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            notifyCount,
        }),
    });

    return <Job>await rawResponse.json();
};
