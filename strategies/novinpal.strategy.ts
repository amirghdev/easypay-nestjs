import { BasePaymentStrategy } from "../types/payment.strategy";
import { NovinpalRequestOptions, NovinpalRequestResponse, NovinpalRequestResponseExtraData } from "../request/novinpal.request";
import { NovinpalVerifyPaymentResponseExtraData } from "../verify/novinpal.verify";
import { BaseRequestResponse } from "../request/request";
import { VerifyOptions, BaseVerifyResponse } from "../verify/verify";
import { InquiryOptions } from "../inquiry/inquiry";
import { BaseInquiryResponse } from "../inquiry/inquiry";
import axios from "axios";

export class NovinpalStrategy implements BasePaymentStrategy<NovinpalRequestResponseExtraData, NovinpalVerifyPaymentResponseExtraData, null> {
  API_URLS = {
    sandbox: "https://api.novinpal.ir/invoice",
    production: "https://api.novinpal.ir/invoice",
  };

  GATEWAY_URLS = {
    sandbox: "https://api.novinpal.ir/invoice/start",
    production: "https://api.novinpal.ir/invoice/start",
  };

  async requestPayment(options: NovinpalRequestOptions): Promise<BaseRequestResponse<NovinpalRequestResponseExtraData>> {
    const url = options.sandbox ? `${this.API_URLS.sandbox}/request` : `${this.API_URLS.production}/request`;
    const gatewayUrl = options.sandbox ? this.GATEWAY_URLS.sandbox : this.GATEWAY_URLS.production;

    try {
      const response = await axios.post<NovinpalRequestResponse>(url, {
        api_key: options.api_key,
        amount: options.amount,
        return_url: options.callbackUrl,
        order_id: options.order_id,
        card_number: options.card_number,
        mobile: options.mobile,
        description: options.description,
      });

      const isSuccess = response.data.status === 1;

      console.log("response", response.data);

      return {
        success: isSuccess,
        code: response.data.errorCode,
        message: isSuccess ? "success" : response.data.errorDescription,
        data: {
          refId: +response.data.refId,
          url: `${gatewayUrl}/${response.data.refId}`,
        },
        raw: response.data,
      };
    } catch (error) {
      console.log("error", error);
    }
  }

  verifyPayment(options: VerifyOptions): Promise<BaseVerifyResponse<NovinpalVerifyPaymentResponseExtraData>> {
    throw new Error("Method not implemented.");
  }

  inquiryPayment(options: InquiryOptions): Promise<BaseInquiryResponse<null>> {
    throw new Error("Novinpal does not support inquiry payment.");
  }
}
