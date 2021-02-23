import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  async getCustomers() {
    const customers = await this.customersService.getCustomers();
    return customers;
  }
  @Get(':customerId')
  async getCustomer(@Param('customerId') customerId) {
    const customer = await this.customersService.getCustomer(customerId);
    return customer;
  }
  @Post()
  async addCustomer(@Body() customerDto: CustomerDto) {
    const customer = await this.customersService.addCustomer(customerDto);
    return customer;
  }
  @Delete()
  async deleteCustomer(@Query() query) {
    const customers = await this.customersService.deleteCustomer(
      query.customerId,
    );
    return customers;
  }
  @Put()
  async updateCustomer(@Body() customerDto: CustomerDto) {
    const customer = await this.customersService.updateCustomer(customerDto);
    return customer;
  }
}
