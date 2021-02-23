import { HttpException, Injectable } from '@nestjs/common';
import { MERCHANTS } from './merchants.mock';

@Injectable()
export class MerchantsService {
  merchants = MERCHANTS;
  getMerchants(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.merchants);
    });
  }
  getMerchant(merchantId): Promise<any> {
    return new Promise((resolve) => {
      const merchant = this.merchants.find(
        (merchant) => merchant.id === merchantId,
      );
      if (!merchant) {
        throw new HttpException('Merchant does not exist', 404);
      }
      resolve(merchant);
    });
  }
}
