export interface ZarinpalErrorCode {
  code: number;
  message: string;
  description: string;
  details: string;
}

export const ZarinpalErrorCodes: Record<string, ZarinpalErrorCode> = {
  // General errors
  "-9": {
    code: -9,
    message: "Validation error",
    description: "خطای اعتبار سنجی",
    details: "مرچنت کد، آدرس بازگشت، توضیحات یا مبلغ پرداختی نامعتبر است",
  },
  "-10": {
    code: -10,
    message: "Terminal is not valid",
    description: "ای پی یا مرچنت كد پذیرنده صحیح نیست",
    details: "Please check merchant_id or ip address",
  },
  "-11": {
    code: -11,
    message: "Terminal is not active",
    description: "مرچنت کد فعال نیست",
    details: "Please contact Zarinpal support team",
  },
  "-12": {
    code: -12,
    message: "Too many attempts",
    description: "تلاش بیش از دفعات مجاز در یک بازه زمانی کوتاه",
    details: "Please try again later",
  },
  "-15": {
    code: -15,
    message: "Terminal user is suspended",
    description: "درگاه پرداخت به حالت تعلیق در آمده است",
    details: "Please contact Zarinpal support team",
  },
  "-16": {
    code: -16,
    message: "Terminal user level is not valid",
    description: "سطح تایید پذیرنده پایین تر از سطح نقره ای است",
    details: "Please contact Zarinpal support team",
  },
  "-17": {
    code: -17,
    message: "Terminal user level is not valid",
    description: "محدودیت پذیرنده در سطح آبی",
    details: "Please contact Zarinpal support team",
  },
  "100": {
    code: 100,
    message: "Success",
    description: "عملیات موفق",
    details: "Operation completed successfully",
  },

  // Payment Request errors
  "-30": {
    code: -30,
    message: "Terminal does not allow floating wages",
    description: "پذیرنده اجازه دسترسی به سرویس تسویه اشتراکی شناور را ندارد",
    details: "Terminal configuration issue",
  },
  "-31": {
    code: -31,
    message: "Terminal does not allow wages",
    description: "حساب بانکی تسویه را به پنل اضافه کنید",
    details: "Please add default bank account in panel",
  },
  "-32": {
    code: -32,
    message: "Invalid wages",
    description: "مبلغ وارد شده از مبلغ کل تراکنش بیشتر است",
    details: "Total floating wages has exceeded maximum amount",
  },
  "-33": {
    code: -33,
    message: "Invalid floating wages",
    description: "درصدهای وارد شده صحیح نیست",
    details: "Check the percentages entered",
  },
  "-34": {
    code: -34,
    message: "Invalid wages",
    description: "مبلغ وارد شده از مبلغ کل تراکنش بیشتر است",
    details: "Total fixed wages has exceeded maximum amount",
  },
  "-35": {
    code: -35,
    message: "Invalid wages",
    description: "تعداد افراد دریافت کننده تسهیم بیش از حد مجاز است",
    details: "Total floating wages has reached the limit in max parts",
  },
  "-36": {
    code: -36,
    message: "Minimum amount for wages too low",
    description: "حداقل مبلغ جهت تسهیم باید ۱۰۰۰۰ ریال باشد",
    details: "The minimum amount for floating wages should be 10,000 Rials",
  },
  "-37": {
    code: -37,
    message: "Inactive IBAN",
    description: "یک یا چند شماره شبای وارد شده برای تسهیم از سمت بانک غیر فعال است",
    details: "One or more IBANs entered for floating wages are inactive",
  },
  "-38": {
    code: -38,
    message: "IBAN not set in Shaparak",
    description: "خطا٬عدم تعریف صحیح شبا٬لطفا دقایقی دیگر تلاش کنید",
    details: "Wages need to set IBAN in Shaparak",
  },
  "-39": {
    code: -39,
    message: "Wages error",
    description: "خطایی رخ داده است به امور مشتریان زرین پال اطلاع دهید",
    details: "Contact Zarinpal support",
  },
  "-40": {
    code: -40,
    message: "Invalid extra params",
    description: "پارامترهای اضافی نامعتبر",
    details: "expire_in is not valid",
  },
  "-41": {
    code: -41,
    message: "Amount exceeds maximum",
    description: "حداکثر مبلغ پرداختی ۱۰۰ میلیون تومان است",
    details: "Maximum amount is 100,000,000 tomans",
  },

  // Payment Verify errors
  "-50": {
    code: -50,
    message: "Invalid session",
    description: "مبلغ پرداخت شده با مقدار مبلغ ارسالی در متد وریفای متفاوت است",
    details: "Amounts values do not match",
  },
  "-51": {
    code: -51,
    message: "Invalid session",
    description: "پرداخت ناموفق",
    details: "Session is not an active paid try",
  },
  "-52": {
    code: -52,
    message: "Unexpected error",
    description: "خطای غیر منتظره‌ای رخ داده است",
    details: "Please contact Zarinpal support team",
  },
  "-53": {
    code: -53,
    message: "Invalid merchant session",
    description: "پرداخت متعلق به این مرچنت کد نیست",
    details: "Session does not belong to this merchant_id",
  },
  "-54": {
    code: -54,
    message: "Invalid authority",
    description: "اتوریتی نامعتبر است",
    details: "The authority parameter is invalid",
  },
  "-55": {
    code: -55,
    message: "Payment not found",
    description: "تراکنش مورد نظر یافت نشد",
    details: "Manual payment request not found",
  },
  "101": {
    code: 101,
    message: "Verified",
    description: "تراکنش وریفای شده است",
    details: "Transaction has been verified",
  },

  // Payment Reverse errors
  "-60": {
    code: -60,
    message: "Cannot reverse transaction",
    description: "امکان ریورس کردن تراکنش با بانک وجود ندارد",
    details: "Session cannot be reversed with bank",
  },
  "-61": {
    code: -61,
    message: "Transaction not successful",
    description: "تراکنش موفق نیست یا قبلا ریورس شده است",
    details: "Session is not in success status",
  },
  "-62": {
    code: -62,
    message: "Terminal IP not set",
    description: "آی پی درگاه ست نشده است",
    details: "Terminal IP limit must be active",
  },
  "-63": {
    code: -63,
    message: "Reverse time expired",
    description: "حداکثر زمان برای ریورس کردن این تراکنش منقضی شده است",
    details: "Maximum time (30 minutes) for reversing this session has expired",
  },
};
