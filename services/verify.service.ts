import { Injectable } from "@nestjs/common";
import { Driver } from "../types/general.type";
import { ZarinpalService } from "./zarinpal.service";
import { VerifyOptions } from "../verify/verify";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponse } from "../verify/zarinpal.verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponse } from "../verify/zibal.verify";
import { ZibalService } from "./zibal.service";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponse } from "../verify/novinpal.verify";
import { NovinpalService } from "./novinpal.service";
import { BaseResponse } from "../types/general.type";
import { BitpayVerifyOptions, BitpayVerifyPaymentResponse } from "verify/bitpay.verify";
import { BitpayService } from "./bitpay.service";

@Injectable()
export class VerifyService {
  constructor(
    private readonly zarinpalService: ZarinpalService,
    private readonly zibalService: ZibalService,
    private readonly novinpalService: NovinpalService,
    private readonly bitpayService: BitpayService,
  ) {}

  public getVerifyBody(driver: Driver, options: VerifyOptions) {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getVerifyBody(options as ZarinpalVerifyOptions);

      case "ZIBAL":
        return this.zibalService.getVerifyBody(options as ZibalVerifyOptions);

      case "NOVINPAL":
        return this.novinpalService.getVerifyBody(options as NovinpalVerifyOptions);

      case "BITPAY":
        return this.bitpayService.getVerifyBody(options as BitpayVerifyOptions);
    }
  }

  public getVerifyResponse(driver: Driver, response: object): BaseResponse {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getVerifyResponse(response as ZarinpalVerifyPaymentResponse);

      case "ZIBAL":
        return this.zibalService.getVerifyResponse(response as ZibalVerifyPaymentResponse);

      case "NOVINPAL":
        return this.novinpalService.getVerifyResponse(response as NovinpalVerifyPaymentResponse);

      case "BITPAY":
        return this.bitpayService.getVerifyResponse(response as BitpayVerifyPaymentResponse);
    }
  }
}
