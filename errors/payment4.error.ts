import { BaseError } from "../types/base/error";

export const Payment4ErrorCodes: Record<string, BaseError> = {
  "1001": {
    code: 1001,
    message: "Validation error",
    description: "پرداخت ناموفق",
    details: "This error occurs when there are validation issues with the request.",
  },
  "1002": {
    code: 1002,
    message: "Api Key is not valid",
    description: "کلید API پرداخت معتبر نیست",
    details: "This error indicates that the API key was not included in the request.",
  },
  "1003": {
    code: 1003,
    message: "Api Key Not Found",
    description: "کلید API پرداخت یافت نشد",
    details: "This error occurs when the provided API key is not found or recognized by the system.",
  },
  "1004": {
    code: 1004,
    message: "Gateway not approved",
    description: "درگاه پرداخت مورد نظر موجود نیست",
    details: "This error signifies that the selected gateway is not approved or authorized for the transaction.",
  },
  "1005": {
    code: 1005,
    message: "assets not found",
    description: "صندوق یافت نشد",
    details: "This error is triggered when the requested assets are not found.",
  },
  "1006": {
    code: 1006,
    message: "payment not found",
    description: "پرداخت یافت نشد",
    details:
      "This error is raised when the specified payment could not be found in the system. Ensure that you are providing the correct payment information.",
  },
  "1010": {
    code: 1010,
    message: "invalid amount",
    description: "مبلغ پرداخت معتبر نیست",
    details:
      "This error is raised when the payment amount provided in the request is invalid or not within the accepted range. Ensure that the amount is within the specified limits.",
  },
  "1011": {
    code: 1011,
    message: "payment amount lower than minimum",
    description: "مبلغ پرداخت کمتر از حداقل مبلغ پذیرش است",
    details: "This error occurs when the payment amount is below the specified minimum limit.",
  },
  "1012": {
    code: 1012,
    message: "invalid currency",
    description: "ارز وارد شده معتبر نیست",
    details: "This error indicates that the provided currency is invalid or not supported.",
  },
  "1013": {
    code: 1013,
    message: "invalid language",
    description: "زبان وارد شده معتبر نیست",
    details: "This error occurs when the specified language is invalid or not supported.",
  },
};
