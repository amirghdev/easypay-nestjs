import { Global, Module } from "@nestjs/common";
import { EasypayService } from "./services/easypay.service";
import { HttpModule } from "@nestjs/axios";
import { RequestService } from "./services/request.service";
import { VerifyService } from "./services/verify.service";
import { ZibalService } from "./services/zibal.service";
import { ZarinpalService } from "./services/zarinpal.service";
import { UrlService } from "./services/url.service";
import { ErrorService } from "./services/error.service";
import { NovinpalService } from "./services/novinpal.service";

@Global()
@Module({
  imports: [HttpModule.register({ global: true })],
  providers: [EasypayService, RequestService, VerifyService, ZibalService, ZarinpalService, UrlService, ErrorService, NovinpalService],
  exports: [EasypayService, UrlService],
})
export class EasypayModule {}
