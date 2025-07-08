import { Driver, RequestType } from "../types/base/general";

export class Logger {
  private context: Driver;
  constructor(driver: Driver) {
    this.context = driver;
  }

  public error(method: RequestType, error: Error) {
    console.error(`Easypay ERROR - [${this.context} ${method}] , ${JSON.stringify(error)}`);
  }
}
