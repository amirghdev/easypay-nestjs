import { Injectable } from "@nestjs/common";
import { UrlService } from "./url.service";
import { InquiryDriver, InquiryOptions, ZarinpalInquiryOptions, ZarinpalInquiryResponse, ZibalInquiryOptions, ZibalInquiryResponse } from "inquiry";
import { ZarinpalService } from "./zarinpal.service";
import { ZibalService } from "./zibal.service";
import { Driver } from "types";

@Injectable()
export class InquiryService {
  constructor(
    private readonly urlService: UrlService,
    private readonly zarinpalService: ZarinpalService,
    private readonly zibalService: ZibalService,
  ) {}

  public getBody(options: InquiryOptions): object {
    switch (options.driver) {
      case "ZARINPAL":
        return this.zarinpalService.getInquiryBody(options as ZarinpalInquiryOptions);
      case "ZIBAL":
        return this.zibalService.getInquiryBody(options as ZibalInquiryOptions);
    }
  }

  public getInquiryResponse(driver: InquiryDriver, response: unknown) {
    switch (driver) {
      case "ZARINPAL":
        return this.zarinpalService.getInquiryResponse(response as ZarinpalInquiryResponse);
      case "ZIBAL":
        return this.zibalService.getInquiryResponse(response as ZibalInquiryResponse);
    }
  }
}
