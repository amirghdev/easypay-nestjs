import axios, { AxiosError } from "axios";
import {
  BasePaymentStrategy,
  BaseRequestResponse,
  BaseVerifyResponse,
  RequestOptions,
  VerifyOptions,
  Payment4RequestResponseExtraData,
  Payment4VerifyResponseExtraData,
  Payment4RequestOptions,
  Payment4RequestResponse,
  Payment4VerifyError,
  Payment4VerifyOptions,
  Payment4VerifyResponse,
} from "types";

export class Payment4Strategy implements BasePaymentStrategy<Payment4RequestResponseExtraData, Payment4VerifyResponseExtraData> {
  private readonly API_URL = "https://service.payment4.com/api/v1/payment";

  async request(data: RequestOptions): Promise<BaseRequestResponse<Payment4RequestResponseExtraData>> {
    const options = data.options as Payment4RequestOptions;

    try {
      const request = await axios.post<Payment4RequestResponse>(
        this.API_URL,
        {
          sandBox: options.sandBox,
          currency: options.currency,
          amount: options.amount,
          callbackUrl: options.callbackUrl,
          callbackParams: options.callbackParams,
          webhookUrl: options.webhookUrl,
          webhookParams: options.webhookParams,
          language: options.language,
        },
        {
          headers: {
            "x-api-key": options.apiKey,
          },
        },
      );

      return {
        success: true,
        code: 100,
        message: "Payment request created successfully",
        data: {
          id: request.data.id,
          paymentUid: request.data.paymentUid,
          url: request.data.paymentUrl,
        },
        raw: request.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorDetails = error?.response?.data as Payment4VerifyError;

        return {
          success: false,
          code: errorDetails.errorCode,
          message: errorDetails.message,
          data: null,
          raw: errorDetails,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Unknown error",
          data: null,
          raw: JSON.stringify(error),
        };
      }
    }
  }

  async verify(data: VerifyOptions): Promise<BaseVerifyResponse<Payment4VerifyResponseExtraData>> {
    const options = data.options as Payment4VerifyOptions;

    try {
      const request = await axios.put<Payment4VerifyResponse>(
        `${this.API_URL}/verify`,
        {
          paymentUid: options.paymentUid,
          amount: options.amount,
          currency: options.currency,
          sandBox: options.sandBox,
        },
        {
          headers: {
            "x-api-key": options.apiKey,
          },
        },
      );

      return {
        success: request.data.verified,
        message: request.data.paymentStatus,
        data: request.data.amountDifference ? { amountDifference: request.data.amountDifference } : null,
        raw: request.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorDetails = error?.response?.data as Payment4VerifyError;

        return {
          success: false,
          code: errorDetails.errorCode || 400,
          message: errorDetails.message,
          data: null,
          raw: errorDetails,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Unknown error",
          data: null,
          raw: JSON.stringify(error),
        };
      }
    }
  }
}
