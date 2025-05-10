import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RequestService } from "./request.service";
import { AxiosError } from "axios";
import { VerifyService } from "./verify.service";
import { RequestOptions } from "../request/request";
import { UrlService } from "./url.service";
import { VerifyOptions } from "../verify/verify";
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
      if (!this.urlService || !this.requestService || !this.httpService || !this.errorService) {
        throw new Error("Required services are not properly injected");
      }

      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "request");

      console.log("url from request", url);

      const body = this.requestService.getRequestBody(options.driver, options);

      console.log("body from request", body);

      const { data } = await this.httpService.axiosRef.post(url, body);

      console.log("data from request", data);

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
      return {
        success: false,
        data: null,
        code: -1,
        message: error?.message || "An unknown error occurred",
        raw: error,
      };
    }
  }

  public async verifyPayment(options: VerifyOptions): Promise<BaseResponse> {
    try {
      if (!this.urlService || !this.verifyService || !this.httpService || !this.errorService) {
        throw new Error("Required services are not properly injected");
      }

      const url = this.urlService.getRequestUrl(options.driver, options.sandbox, "verify");

      console.log("url from verify", url);

      const body = this.verifyService.getVerifyBody(options.driver, options);

      console.log("body from verify", body);

      const { data } = await this.httpService.axiosRef.post(url, body);

      console.log("data from verify", data);

      const response = this.verifyService.getVerifyResponse(options.driver, data);

      console.log("response from verify", response);

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
      return {
        success: false,
        data: null,
        code: -1,
        message: error?.message || "An unknown error occurred",
        raw: error,
      };
    }
  }
}
