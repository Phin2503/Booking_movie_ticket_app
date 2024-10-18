import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { TheaterModule } from './theater/theater.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { SeatModule } from './seat/seat.module';
import { SeatReservationModule } from './seat_reservation/seat_reservation.module';
import { ShowtimeSeatModule } from './showtime_seat/showtime_seat.module';
import { TicketModule } from './ticket/ticket.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { TransactionHistoryModule } from './transaction_history/transaction_history.module';
import { VnpayTransactionModule } from './vnpay_transaction/vnpay_transaction.module';
import { CloudinaryModule } from './configs/cloudinary.module';
import { UploadController } from './configs/upload.controller';
import { CloudinaryService } from './configs/cloudinary.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    CloudinaryModule,
    ConfigModule.forRoot(),
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
    MailModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
