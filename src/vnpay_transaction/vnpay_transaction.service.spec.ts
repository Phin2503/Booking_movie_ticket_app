import { Test, TestingModule } from '@nestjs/testing';
import { VnpayTransactionService } from './vnpay_transaction.service';

describe('VnpayTransactionService', () => {
  let service: VnpayTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VnpayTransactionService],
    }).compile();

    service = module.get<VnpayTransactionService>(VnpayTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
