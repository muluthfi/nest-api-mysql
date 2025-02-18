import { Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
    ) {}

    //CRUD Create
    async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
     const createdTransaction = new this.transactionModel(transaction);
     return createdTransaction.save();
    }

    //CRUD Read
    async getTransactions(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
    }

    //CRUD Update
    async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
        return this.transactionModel.findByIdAndUpdate(id, transaction, {new: true}).exec();
    }

    //CRUD Delete
    async deleteTransaction(id: string): Promise<Transaction> {
        return this.transactionModel.findByIdAndDelete(id).exec();
    }
}