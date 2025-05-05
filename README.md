# ایزی‌پی (EasyPay)

کتابخانه‌ای ساده برای ادغام درگاه‌های پرداخت ایرانی در پروژه‌های نست جی اس.

## نصب

برای نصب کتابخانه، از دستور زیر استفاده کنید:

```bash
npm install easypay-nestjs
```

## استفاده

## اضافه کردن ماژول به فایل app.module

```typescript
import { EasypayModule } from "easypay-nestjs";

@Module({
  imports: [EasypayModule],
})
export class AppModule {}
```

## اضافه کردن سرویس

```typescript
import { EasypayService } from "easypay-nestjs";

export class PaymentService {
  constructor(private readonly easypayService: EasypayService) {}
}
```

### مثال: پرداخت با زرین‌پال

```javascript
const zarinpalRequest = await this.easypayService.requestPayment({
  amount: 200000 // قیمت به ریال,
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

const zarinpalRequestExtraData = zarinpalRequest.data as ZarinpalRequestResponseExtraData;

console.log(zarinpalRequestExtraData)

const zarinpalVerify = await this.easypayService.verifyPayment({
  amount: 200000,
  driver: "ZARINPAL",
  merchantId: "merchant",
  sandbox: true,
  authority: zarinpalRequestExtraData.authority,
})

if (!zarinpalVerify.success) {
    console.log("Verify zarinpal error", zarinpalVerify);
}
console.log("Verify zarinpal success", zarinpalVerify);
const zarinpalVerifyExtraData = zarinpalVerify.data as ZarinpalVerifyPaymentResponseExtraData;

console.log(zarinpalVerifyExtraData)


```

## درگاه‌های پشتیبانی‌شده

- زرین‌ پال (ZarinPal)
- زیبال (Zibal)
- نوین پال (Novinpal)

ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی
