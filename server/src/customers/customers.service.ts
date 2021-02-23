import { HttpException, Injectable } from '@nestjs/common';
import { CUSTOMERS } from './customers.mock';

@Injectable()
export class CustomersService {
  customers = CUSTOMERS;
  getCustomers(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.customers);
    });
  }
  getCustomer(courseId): Promise<any> {
    return new Promise((resolve) => {
      const customer = this.customers.find(
        (customer) => customer.id === courseId,
      );
      if (!customer) {
        throw new HttpException('Customer does not exist', 404);
      }
      resolve(customer);
    });
  }
  addCustomer(newCustomer): Promise<any> {
    return new Promise((resolve) => {
      const index = CUSTOMERS.findIndex(
        (customer) => customer.id === newCustomer.id,
      );
      if (index >= 0) {
        throw new HttpException('Customer already exists', 200);
      }
      CUSTOMERS.push(newCustomer);
      resolve(CUSTOMERS);
    });
  }
  deleteCustomer(customerId): Promise<any> {
    return new Promise((resolve) => {
      const index = this.customers.findIndex(
        (customer) => customer.id === customerId,
      );
      if (index === -1) {
        throw new HttpException('Customer does not exist', 404);
      }
      this.customers.splice(index, 1);
      resolve(this.customers);
    });
  }
  updateCustomer(updatedCustomer): Promise<any> {
    return new Promise((resolve) => {
      const index = CUSTOMERS.findIndex(
        (customer) => customer.id === updatedCustomer.id,
      );
      if (index === -1) {
        throw new HttpException('Customer does not exist', 404);
      }
      CUSTOMERS[index] = updatedCustomer;
      resolve(CUSTOMERS);
    });
  }
}
