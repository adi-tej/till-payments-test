import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}
  @Get()
  async getMerchants() {
    const merchants = await this.merchantsService.getMerchants();
    return merchants;
  }
  @Get(':merchantId')
  async getMerchant(@Param('merchantId') merchantId) {
    const merchant = await this.merchantsService.getMerchant(merchantId);
    return merchant;
  }
}
