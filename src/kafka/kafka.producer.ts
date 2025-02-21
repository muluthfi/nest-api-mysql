import { Injectable, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaProducer {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    async sendMessage(topic: string, message: any) {
        this.kafkaClient.emit(topic, JSON.stringify(message));
        console.log(`Sent message to topic [${topic}]`,message);
    }
}