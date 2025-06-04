import { Global, Module } from "@nestjs/common";
import { EasypayService } from "./services/easypay.service";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [HttpModule],
  providers: [EasypayService],
  exports: [EasypayService],
})
export class EasypayModule {}
