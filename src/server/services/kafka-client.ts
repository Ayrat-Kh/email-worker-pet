import { Kafka, Producer } from 'kafkajs';

export const getKafka = (): Kafka => {
    console.log('process.env.KAFKA_BROKERS', process.env.KAFKA_BROKERS);
    return new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: process.env.KAFKA_BROKERS!.split(',') ?? [],
    });
};

export enum KafkaTopics {
    HandleJob = 'job.handle',
}

export const sendToQueue = async (
    values: object[],
    producer: Producer,
    topic: string
) => {
    try {
        await producer.connect();

        const topicMessage = {
            topic,
            messages: values.map((value) => ({ value: JSON.stringify(value) })),
        };

        await producer.send(topicMessage);
    } finally {
        await producer.disconnect();
    }
};
