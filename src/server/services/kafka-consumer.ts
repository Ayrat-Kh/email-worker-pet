import { Kafka } from 'kafkajs';

import { getKafka, KafkaTopics } from './kafka-client';
import { NotifyEmail } from 'app/types';
import { handleEmailJob } from './email-schedule';

export const initKafkaConsumer = async (): Promise<Kafka> => {
    const kafka = getKafka();
    const handleTopicConsumer = kafka.consumer({
        groupId: KafkaTopics.HandleJob,
        retry: {
            retries: 3,
        },
    });

    await handleTopicConsumer.subscribe({
        topic: KafkaTopics.HandleJob,
        fromBeginning: false,
    });
    handleTopicConsumer.on('consumer.crash', () =>
        console.log('handleTopicConsumer consumer crashed')
    );
    handleTopicConsumer.run({
        eachMessage: ({ message }) =>
            handleStartEmailJob(
                JSON.parse(message.value!.toString()) as NotifyEmail
            ),
    });

    return kafka;
};

const handleStartEmailJob = async (message: NotifyEmail) => {
    try {
        await handleEmailJob(message.jobId, message.emailId);
    } catch (e) {
        console.error('error occured', e);
    }
};
