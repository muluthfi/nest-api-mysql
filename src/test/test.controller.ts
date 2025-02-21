import { Controller, Get } from "@nestjs/common";
import { KafkaProducer } from '../kafka/kafka.producer';

@Controller('test')
export class TestController {
    constructor(private readonly kafkaProducer: KafkaProducer) {}
    
    @Get('send')
    async sendMessage() {
        await this.kafkaProducer.sendMessage('my-topic', { text: 'tahu bulat' });
        return { message: 'sent to Kafka' };
    }
}