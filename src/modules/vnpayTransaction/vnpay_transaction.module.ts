import { Module } from '@nestjs/common';
import { VnpayTransactionService } from './vnpay_transaction.service';
import { VnpayTransactionController } from './vnpay_transaction.controller';

@Module({
  providers: [VnpayTransactionService],
  controllers: [VnpayTransactionController]
})
export class VnpayTransactionModule {}
