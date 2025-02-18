import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './transaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}