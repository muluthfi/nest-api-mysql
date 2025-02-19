import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka.consumer.service";
import { from } from "rxjs";

@Injectable()
export class KafkaConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume(
            { topic: 'my-topic', fromBeginning: true },
            async (message) => {
                console.log('received message', message.value.toString());
            }
        )
    }
}