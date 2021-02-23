import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CUSTOMERS } from './customers.mock';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get all customers', () => {
    expect(controller.getCustomers()).toBe(CUSTOMERS);
  });
  it('should get customer by id', () => {
    expect(controller.getCustomer('001')).toBe(CUSTOMERS[0]);
  });
});
