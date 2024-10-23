import { Test, TestingModule } from '@nestjs/testing';
import { VnpayTransactionController } from './vnpay_transaction.controller';

describe('VnpayTransactionController', () => {
  let controller: VnpayTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VnpayTransactionController],
    }).compile();

    controller = module.get<VnpayTransactionController>(VnpayTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
