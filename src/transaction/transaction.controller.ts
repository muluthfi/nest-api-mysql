import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}


@Post()
async create(@Body() transaction: Partial<Transaction>) {
    return this.transactionService.createTransaction(transaction);
}

@Get()
@UseGuards(AuthGuard('jwt'))
async findAll() {
    return this.transactionService.getTransactions();
}

@Put(':id')
async update(@Param('id')
 id: string, 
 @Body() transaction: Partial<Transaction>,) {
    return this.transactionService.updateTransaction(id, transaction);
 }

 @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.transactionService.deleteTransaction(id);
    }
}