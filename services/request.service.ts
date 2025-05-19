import { Injectable } from "@nestjs/common";
import { BaseResponse, Driver } from "../types/general.type";
import { ZarinpalService } from "./zarinpal.service";
import { BaseRequestResponse, RequestData, RequestOptions } from "../request/request";
import { ZarinpalRequestOptions, ZarinpalRequestResponse } from "../request/zarinpal.request";
import { ZibalService } from "./zibal.service";
import { ZibalRequestOptions, ZibalRequestResponse } from "../request/zibal.request";
import { NovinpalService } from "./novinpal.service";
import { NovinpalRequestOptions, NovinpalRequestResponse } from "../request/novinpal.request";

@Injectable()
export class RequestService {
  constructor(
    private readonly zarinpalService: ZarinpalService,
    private readonly zibalService: ZibalService,
    private readonly novinpalService: NovinpalService,
  ) {}

  public getRequestBody(driver: Driver, options: RequestOptions): object {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getRequestBody(options as ZarinpalRequestOptions);

      case "ZIBAL":
        return this.zibalService.getRequestBody(options as ZibalRequestOptions);

      case "NOVINPAL":
        return this.novinpalService.getRequestBody(options as NovinpalRequestOptions);
    }
  }

  public getRequestResponse<T extends RequestData>(driver: Driver, response: unknown, sandbox: boolean): BaseRequestResponse<T> {
    switch (driver) {
      case "ZARINPAL": {
        const result = this.zarinpalService.getRequestResponse(response as ZarinpalRequestResponse, sandbox);
        return {
          ...result,
          data: result.data as T,
        };
      }

      case "ZIBAL": {
        const result = this.zibalService.getRequestResponse(response as ZibalRequestResponse, sandbox);
        return {
          ...result,
          data: result.data as T,
        };
      }

      case "NOVINPAL": {
        const result = this.novinpalService.getRequestResponse(response as NovinpalRequestResponse, sandbox);
        return {
          ...result,
          data: result.data as T,
        };
      }
    }
  }
}
