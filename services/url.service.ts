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
  };

  public getRequestUrl(driver: Driver, sandbox: boolean, type: RequestType) {
    switch (driver) {
      case "ZARINPAL":
        return sandbox ? `${this.ApiUrls.ZARINPAL.SANDBOX}/${type}.json` : `${this.ApiUrls.ZARINPAL.PRODUCTION}/${type}.json`;

      case "ZIBAL":
        return sandbox ? `${this.ApiUrls.ZIBAL.SANDBOX}/${type}` : `${this.ApiUrls.ZIBAL.PRODUCTION}/${type}`;

      case "NOVINPAL":
        return sandbox ? `${this.ApiUrls.NOVINPAL.SANDBOX}/${type}` : `${this.ApiUrls.NOVINPAL.PRODUCTION}/${type}`;
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
    }
  }
}
