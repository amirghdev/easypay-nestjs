import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RequestService } from "./request.service";
import { AxiosError } from "axios";
import { VerifyService } from "./verify.service";
import { BaseRequestResponse, RequestOptions, RequestData } from "../request/request";
import { UrlService } from "./url.service";
import { BaseVerifyResponse, VerifyData, VerifyOptions } from "../verify/verify";
import { ErrorService } from "./error.service";
import { BaseResponse } from "../types/general.type";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../inquiry/inquiry";
import { InquiryService } from "./inquiry.service";
import { NovinpalRequestResponseExtraData, ZarinpalRequestResponseExtraData, ZibalRequestResponseExtraData } from "request";

@Injectable()
export class EasypayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestService: RequestService,
    private readonly verifyService: VerifyService,
    private readonly urlService: UrlService,
    private readonly errorService: ErrorService,
    private readonly inquiryService: InquiryService,
  ) {}

  public async requestPayment<T extends RequestData>(options: RequestOptions): Promise<BaseRequestResponse<T>> {
    try {
      if (!this.urlService || !this.requestService || !this.httpService || !this.errorService) {
        throw new Error("Required services are not properly injected");
      }

      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "request");
      const body = this.requestService.getRequestBody(options.driver, options);

      const { data } = await this.httpService.axiosRef.post(url, body);

      const response = this.requestService.getRequestResponse<T>(options.driver, data, options.sandbox);
      response.raw = data;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("easypay request error", error?.response?.data);
        const errorResponse = this.errorService.getRequestError(error, options.driver);

        return {
          success: false,
          data: undefined,
          code: errorResponse.code,
          message: errorResponse.message,
          raw: error?.response?.data,
        } as BaseRequestResponse<T>;
      }
      return {
        success: false,
        data: undefined,
        code: -1,
        message: error?.message || "An unknown error occurred",
        raw: error,
      } as BaseRequestResponse<T>;
    }
  }

  public async verifyPayment<T extends VerifyData>(options: VerifyOptions): Promise<BaseVerifyResponse<T>> {
    try {
      if (!this.urlService || !this.verifyService || !this.httpService || !this.errorService) {
        throw new Error("Required services are not properly injected");
      }

      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "verify");

      const body = this.verifyService.getVerifyBody(options.driver, options);

      const { data } = await this.httpService.axiosRef.post(url, body);

      const response = this.verifyService.getVerifyResponse<T>(options.driver, data);

      response.raw = data;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("easypay verify error", error?.response?.data);
        const errorResponse = this.errorService.getVerifyError(error, options.driver);
        return {
          success: false,
          data: undefined,
          code: errorResponse.code,
          message: errorResponse.message,
          raw: error?.response?.data,
        } as BaseVerifyResponse<T>;
      }
      return {
        success: false,
        data: undefined,
        code: -1,
        message: error?.message || "An unknown error occurred",
        raw: error,
      } as BaseVerifyResponse<T>;
    }
  }

  public async inquiryPayment<T extends InquiryData>(options: InquiryOptions): Promise<BaseInquiryResponse<T>> {
    try {
      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "inquiry");

      const body = this.inquiryService.getBody(options);

      const { data } = await this.httpService.axiosRef.post(url, body);

      const response = this.inquiryService.getInquiryResponse<T>(options.driver, data);

      response.raw = data;

      return response;
    } catch (error) {
      console.log("inquiry error", JSON.stringify(error));
    }
  }
}
