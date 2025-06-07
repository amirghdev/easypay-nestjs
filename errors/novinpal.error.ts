import { BaseError } from "../types/base/error";

export const NovinpalErrorCodes: Record<string, BaseError> = {
  "101": {
    code: 101,
    message: "IP address is not valid",
    description: "آی پی سایت پذیرنده مجاز نیست",
    details: "Please check your IP address",
  },
  "102": {
    code: 102,
    message: "Terminal is blocked",
    description: "ترمینال بلاک شده است",
    details: "The terminal has been blocked",
  },
  "103": {
    code: 103,
    message: "Return URL does not belong to the merchant",
    description: "آدرس بازگشتی متعلق به سایت پذیرنده نیست",
    details: "The return URL is not associated with the merchant",
  },
  "104": {
    code: 104,
    message: "PSP Error",
    description: "خطای PSP",
    details: "Payment Service Provider error occurred",
  },
  "107": {
    code: 107,
    message: "PSP not found",
    description: "PSP یافت نشد",
    details: "Payment Service Provider not found",
  },
  "108": {
    code: 108,
    message: "Server Error",
    description: "خطای سرور",
    details: "An error occurred on the server",
  },
  "110": {
    code: 110,
    message: "Invalid amount or less than 10000 Rials",
    description: "مبلغ اشتباه وارد شده یا کمتر از 10000 ریال است",
    details: "The amount is invalid or less than 10000 Rials",
  },
  "111": {
    code: 111,
    message: "Invalid API Key",
    description: "کلید API اشتباه است",
    details: "The provided API key is invalid",
  },
  "112": {
    code: 112,
    message: "Merchant is inactive",
    description: "پذیرنده غیرفعال است",
    details: "The merchant account is inactive",
  },
  "114": {
    code: 114,
    message: "Invalid method",
    description: "متد ارسال شده اشتباه است",
    details: "The provided method is invalid",
  },
  "115": {
    code: 115,
    message: "Terminal not verified",
    description: "ترمینال تأیید نشده است",
    details: "The terminal has not been verified",
  },
  "116": {
    code: 116,
    message: "Terminal is inactive",
    description: "ترمینال غیرفعال است",
    details: "The terminal is inactive",
  },
  "117": {
    code: 117,
    message: "Terminal rejected",
    description: "ترمینال رد شده است",
    details: "The terminal has been rejected",
  },
  "118": {
    code: 118,
    message: "Terminal suspended",
    description: "ترمینال تعلیق شده است",
    details: "The terminal has been suspended",
  },
  "119": {
    code: 119,
    message: "Terminal not defined",
    description: "ترمینالی تعریف نشده است",
    details: "No terminal has been defined",
  },
  "120": {
    code: 120,
    message: "Merchant account suspended",
    description: "حساب کاربری پذیرنده به حالت تعلیق درآمده است",
    details: "The merchant account has been suspended",
  },
  "121": {
    code: 121,
    message: "Merchant account not verified",
    description: "حساب کاربری پذیرنده تأیید نشده است",
    details: "The merchant account has not been verified",
  },
  "122": {
    code: 122,
    message: "Merchant account not found",
    description: "حساب کاربری پذیرنده یافت نشد",
    details: "The merchant account could not be found",
  },
  "123": {
    code: 123,
    message: "Invalid card",
    description: "کارت نامعتبر است",
    details: "The card is invalid (mismatch between sent card and payment card)",
  },
};
