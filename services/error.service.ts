import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { Driver } from "../types/general.type";
import { ZarinpalService } from "./zarinpal.service";
import { ZarinpalRequestResponse } from "../request/zarinpal.request";
import { ZarinpalVerifyPaymentResponse } from "../verify/zarinpal.verify";
import { NovinpalService } from "./novinpal.service";
import { NovinpalRequestErrorData } from "../request/novinpal.request";
import { NovinpalVerifyPaymentResponseError } from "../verify/novinpal.verify";

@Injectable()
export class ErrorService {
  constructor(
    private readonly zarinpalService: ZarinpalService,
    private readonly novinpalService: NovinpalService,
  ) {}

  public getRequestError(error: AxiosError, driver: Driver) {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getRequestResponseError(error.response?.data as ZarinpalRequestResponse);

      case "NOVINPAL":
        return this.novinpalService.getRequestResponseError(error.response?.data as NovinpalRequestErrorData);
    }
  }

  public getVerifyError(error: AxiosError, driver: Driver) {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getVerifyResponseError(error.response?.data as ZarinpalVerifyPaymentResponse);

      case "NOVINPAL":
        return this.novinpalService.getVerifyResponseError(error.response?.data as NovinpalVerifyPaymentResponseError);
    }
  }
}
