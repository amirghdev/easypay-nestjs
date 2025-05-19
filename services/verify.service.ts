import { Injectable } from "@nestjs/common";
import { Driver } from "../types/general.type";
import { ZarinpalService } from "./zarinpal.service";
import { BaseVerifyResponse, VerifyData, VerifyOptions } from "../verify/verify";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponse } from "../verify/zarinpal.verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponse } from "../verify/zibal.verify";
import { ZibalService } from "./zibal.service";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponse } from "../verify/novinpal.verify";
import { NovinpalService } from "./novinpal.service";
import { BaseResponse } from "../types/general.type";

@Injectable()
export class VerifyService {
  constructor(
    private readonly zarinpalService: ZarinpalService,
    private readonly zibalService: ZibalService,
    private readonly novinpalService: NovinpalService,
  ) {}

  public getVerifyBody(driver: Driver, options: VerifyOptions) {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getVerifyBody(options as ZarinpalVerifyOptions);

      case "ZIBAL":
        return this.zibalService.getVerifyBody(options as ZibalVerifyOptions);

      case "NOVINPAL":
        return this.novinpalService.getVerifyBody(options as NovinpalVerifyOptions);
    }
  }

  public getVerifyResponse<T extends VerifyData>(driver: Driver, response: object): BaseVerifyResponse<T> {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getVerifyResponse(response as ZarinpalVerifyPaymentResponse) as BaseVerifyResponse<T>;

      case "ZIBAL":
        return this.zibalService.getVerifyResponse(response as ZibalVerifyPaymentResponse) as BaseVerifyResponse<T>;

      case "NOVINPAL":
        return this.novinpalService.getVerifyResponse(response as NovinpalVerifyPaymentResponse) as BaseVerifyResponse<T>;
    }
  }
}
