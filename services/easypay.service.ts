import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RequestService } from "./request.service";
import { AxiosError } from "axios";
import { VerifyService } from "./verify.service";
import { RequestOptions, BaseRequestResponse } from "../request/request";
import { UrlService } from "./url.service";
import { BaseVerifyResponse, VerifyOptions } from "../verify/verify";
import { ErrorService } from "./error.service";
import { BaseResponse } from "../types/general.type";

@Injectable()
export class EasypayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestService: RequestService,
    private readonly verifyService: VerifyService,
    private readonly urlService: UrlService,
    private readonly errorService: ErrorService,
  ) {}

  public async requestPayment(options: RequestOptions): Promise<BaseResponse> {
    try {
      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "request");
      const body = this.requestService.getRequestBody(options.driver, options);

      const { data } = await this.httpService.axiosRef.post(url, body);

      const response = this.requestService.getRequestResponse(options.driver, data, options.sandbox);

      response.raw = data;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("easypay request error", error?.response?.data);
        const errorResponse = this.errorService.getRequestError(error, options.driver);

        return {
          success: false,
          data: null,
          code: errorResponse.code,
          message: errorResponse.message,
          raw: error?.response?.data,
        };
      }
    }
  }

  public async verifyPayment(options: VerifyOptions): Promise<BaseResponse> {
    try {
      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "verify");

      const body = this.verifyService.getVerifyBody(options.driver, options);

      const { data } = await this.httpService.axiosRef.post(url, body);

      const response = this.verifyService.getVerifyResponse(options.driver, data);

      response.raw = data;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("easypay verify error", error?.response?.data);
        const errorResponse = this.errorService.getVerifyError(error, options.driver);
        return {
          success: false,
          data: null,
          code: errorResponse.code,
          message: errorResponse.message,
          raw: error?.response?.data,
        };
      }
    }
  }
}
