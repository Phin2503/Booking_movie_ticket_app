import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './module/movie/movie.module';
import { TheaterModule } from './module/theater/theater.module';
import { ShowtimeModule } from './module/showtime/showtime.module';
import { SeatModule } from './module/seat/seat.module';
import { SeatReservationModule } from './module/seat_reservation/seat_reservation.module';
import { ShowtimeSeatModule } from './module/showtime_seat/showtime_seat.module';
import { TicketModule } from './module/ticket/ticket.module';
import { PaymentModule } from './module/payment/payment.module';
import { ReviewModule } from './module/review/review.module';
import { TransactionHistoryModule } from './module/transaction_history/transaction_history.module';
import { VnpayTransactionModule } from './module/vnpay_transaction/vnpay_transaction.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadController } from './cloudinary/upload.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';

import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './configs/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => MailConfig(),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.HOST_REDIS,
        port: +process.env.PORT_REDIS,
      },
    }),
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MovieModule,
    TheaterModule,
    ShowtimeModule,
    SeatModule,
    SeatReservationModule,
    ShowtimeSeatModule,
    TicketModule,
    PaymentModule,
    ReviewModule,
    TransactionHistoryModule,
    VnpayTransactionModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
