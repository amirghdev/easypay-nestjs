import { Injectable } from "@nestjs/common";
import { Driver, RequestType } from "../types/general.type";

@Injectable()
export class UrlService {
  private readonly ApiUrls: {
    [key in Driver]: {
      [key: string]: string;
    };
  } = {
    ZARINPAL: {
      SANDBOX: "https://sandbox.zarinpal.com/pg/v4/payment",
      PRODUCTION: "https://api.zarinpal.com/pg/v4/payment",
    },
    ZIBAL: {
      SANDBOX: "https://gateway.zibal.ir/v1",
      PRODUCTION: "https://gateway.zibal.ir/v1",
    },
    NOVINPAL: {
      SANDBOX: " https://api.novinpal.ir/invoice",
      PRODUCTION: " https://api.novinpal.ir/invoice",
    },
    BITPAY: {
      SANDBOX: "https://bitpay.ir/payment-test",
      PRODUCTION: "https://bitpay.ir/payment",
    },
  };

  private readonly GatewayUrls: {
    [key in Driver]: {
      [key: string]: string;
    };
  } = {
    ZARINPAL: {
      SANDBOX: "https://sandbox.zarinpal.com/pg/StartPay",
      PRODUCTION: "https://payment.zarinpal.com/pg/StartPay",
    },
    ZIBAL: {
      SANDBOX: "https://gateway.zibal.ir/start",
      PRODUCTION: "https://gateway.zibal.ir/start",
    },
    NOVINPAL: {
      SANDBOX: " https://api.novinpal.ir/invoice/start",
      PRODUCTION: " https://api.novinpal.ir/invoice/start",
    },
    BITPAY: {
      SANDBOX: "https://bitpay.ir/payment-test",
      PRODUCTION: "https://bitpay.ir/payment",
    },
  };

  public getRequestUrl(driver: Driver, sandbox: boolean, type: RequestType) {
    switch (driver) {
      case "ZARINPAL":
        return sandbox ? `${this.ApiUrls.ZARINPAL.SANDBOX}/${type}.json` : `${this.ApiUrls.ZARINPAL.PRODUCTION}/${type}.json`;

      case "ZIBAL":
        return sandbox ? `${this.ApiUrls.ZIBAL.SANDBOX}/${type}` : `${this.ApiUrls.ZIBAL.PRODUCTION}/${type}`;

      case "NOVINPAL":
        return sandbox ? `${this.ApiUrls.NOVINPAL.SANDBOX}/${type}` : `${this.ApiUrls.NOVINPAL.PRODUCTION}/${type}`;

      case "BITPAY":
        if (type === "request") {
          return sandbox ? `${this.ApiUrls.BITPAY.SANDBOX}/gateway-send` : `${this.ApiUrls.BITPAY.PRODUCTION}/gateway-send`;
        } else if (type === "verify") {
          return sandbox ? `${this.ApiUrls.BITPAY.SANDBOX}/gateway-result-second` : `${this.ApiUrls.BITPAY.PRODUCTION}/gateway-result-second`;
        }
    }
  }

  public getGatewayUrl(driver: Driver, sandbox: boolean, authority: string | number) {
    switch (driver) {
      case "ZARINPAL":
        return sandbox ? `${this.GatewayUrls.ZARINPAL.SANDBOX}/${authority}` : `${this.GatewayUrls.ZARINPAL.PRODUCTION}/${authority}`;

      case "ZIBAL":
        return sandbox ? `${this.GatewayUrls.ZIBAL.SANDBOX}/${authority}` : `${this.GatewayUrls.ZIBAL.PRODUCTION}/${authority}`;

      case "NOVINPAL":
        return sandbox ? `${this.GatewayUrls.NOVINPAL.SANDBOX}/${authority}` : `${this.GatewayUrls.NOVINPAL.PRODUCTION}/${authority}`;

      case "BITPAY":
        return sandbox
          ? `${this.GatewayUrls.BITPAY.SANDBOX}/gateway-${authority}-get`
          : `${this.GatewayUrls.BITPAY.PRODUCTION}/gateway-${authority}-get`;
    }
  }
}
