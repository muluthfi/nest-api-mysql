import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Client } from 'node-rdkafka';  
import * as fs from 'fs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaProducer } from './kafka/kafka.producer';
import { Test } from '@nestjs/testing';
import { TestModule } from './test/test.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false, // Pakai migration
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'nestjs-client',
    //         brokers: [process.env.KAFKA_BROKER],
    //         ssl: {
    //           ca: [fs.readFileSync('./src/kafka/certs/ca.pem', 'utf-8')],
    //           cert: [fs.readFileSync('./src/kafka/certs/service.cert', 'utf-8')],
    //           key: [fs.readFileSync('./src/kafka/certs/service.key', 'utf-8')],
    //         },
    //       },
    //       consumer: {
    //         groupId: 'nestjs-group',
    //       },
    //     },
    //   },
    // ]),
    UserModule,
    AuthModule,
    TransactionModule,
    // TestModule,
  ],
})
export class AppModule {}
