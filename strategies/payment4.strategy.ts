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
  Payment4RequestError,
} from "types";

export class Payment4Strategy implements BasePaymentStrategy<Payment4RequestResponseExtraData, Payment4VerifyResponseExtraData, null> {
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
        const errorDetails = error?.response?.data as Payment4RequestError;

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

  verify(options: VerifyOptions): Promise<BaseVerifyResponse<Payment4VerifyResponseExtraData>> {
    throw new Error("Method not implemented.");
  }
}
