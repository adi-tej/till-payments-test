import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsController } from './merchants.controller';
import { CUSTOMERS } from '../customers/customers.mock';
import { MERCHANTS } from './merchants.mock';

describe('MerchantsController', () => {
  let controller: MerchantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantsController],
    }).compile();

    controller = module.get<MerchantsController>(MerchantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get all merchants', () => {
    expect(controller.getMerchants()).toBe(MERCHANTS);
  });
  it('should get merchant by id', () => {
    expect(controller.getMerchant('001')).toBe(MERCHANTS[0]);
  });
});
