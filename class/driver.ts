import {
  NovinpalRequestOptions,
  NovinpalRequestPaymentOptions,
  NovinpalRequestResponse,
  NovinpalRequestResponseExtraData,
} from "../types/novinpal/request";
import { BaseRequestResponse } from "../types/base/request";
import {
  ZarinpalRequestOptions,
  ZarinpalRequestPaymentOptions,
  ZarinpalRequestResponse,
  ZarinpalRequestResponseExtraData,
} from "../types/zarinpal/request";
import { ZibalRequestOptions, ZibalRequestResponse, ZibalRequestResponseExtraData } from "../types/zibal/request";
import { ZibalRequestPaymentOptions } from "../types/zibal/request";

export abstract class BasicDriver {
  abstract getRequestBody(
    options: ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions,
  ): ZarinpalRequestPaymentOptions | ZibalRequestPaymentOptions | NovinpalRequestPaymentOptions;

  abstract getRequestResponse(
    response: ZarinpalRequestResponse | ZibalRequestResponse | NovinpalRequestResponse,
    sandbox: boolean,
  ): BaseRequestResponse<ZarinpalRequestResponseExtraData | ZibalRequestResponseExtraData | NovinpalRequestResponseExtraData>;
}
