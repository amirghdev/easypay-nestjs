# ایزی‌پی (EasyPay)

کتابخانه‌ای ساده برای ادغام درگاه‌های پرداخت ایرانی در پروژه‌های نست جی اس.

## نصب

#### npm

```bash
npm install easypay-nestjs
```

#### yarn

```bash
yarn add easypay-nestjs
```

## استفاده

#### اضافه کردن ماژول به فایل app.module

```typescript
import { EasypayModule } from "easypay-nestjs";

@Module({
  imports: [EasypayModule],
})
export class AppModule {}
```

#### اضافه کردن سرویس

```typescript
import { EasypayService, ZarinpalRequestResponseExtraData, ZibalRequestResponseExtraData } from "easypay-nestjs";

export class PaymentService {
  constructor(private readonly easypayService: EasypayService) {}
}
```

#### مثال: پرداخت با زرین‌پال

```typescript
const zarinpalRequest = await this.easypayService.requestPayment({
  amount: 200000, // قیمت به ریال
  callbackUrl: "callback",
  driver: "ZARINPAL",
  merchantId: "your code",
  sandbox: true,
  description: "شماره فاکتور 1",
  metadata: {
    mobile: "your number",
    email: "your email",
  },
});
if (!zarinpalRequest.success) {
  console.log("Request zarinpal error", zarinpalRequest);
  return;
}
console.log("Request zarinpal success", zarinpalRequest);
```

#### اعتبار سنجی

```typescript
const zarinpalRequestExtraData = zarinpalRequest.data as ZarinpalRequestResponseExtraData;

console.log(zarinpalRequestExtraData);

const zarinpalVerify = await this.easypayService.verifyPayment({
  amount: 200000,
  driver: "ZARINPAL",
  merchantId: "merchant",
  sandbox: true,
  authority: zarinpalRequestExtraData.authority,
});

if (!zarinpalVerify.success) {
  console.log("Verify zarinpal error", zarinpalVerify);
}
console.log("Verify zarinpal success", zarinpalVerify);
const zarinpalVerifyExtraData = zarinpalVerify.data as ZarinpalVerifyPaymentResponseExtraData;

console.log(zarinpalVerifyExtraData);
```

#### استعلام وضعیت پرداخت

```typescript
const zarinpalInquiry = await this.easypayService.inquiryPayment({
  driver: "ZARINPAL",
  authority: zarinpalRequestExtraData.authority,
  merchant_id: "your merchant",
  sandbox: true,
});
console.log(zarinpalInquiry);
```

## درگاه‌های پشتیبانی‌شده

- زرین‌ پال (ZarinPal)
- زیبال (Zibal)
- نوین پال (Novinpal)

ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی
