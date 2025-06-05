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
import { EasypayService } from "easypay-nestjs";

export class PaymentService {
  constructor(private readonly easypayService: EasypayService) {}
}
```

#### مثال: پرداخت با زرین‌پال

```typescript
const zarinpalRequest = await this.easypayService.request({
  driver: "ZARINPAL",
  options: {
    amount: 20000, // ( قیمت به ریال می باشد )
    callbackUrl: "",
    merchantId: "",
    description: "",
    sandbox: true,
  },
});
```

#### اعتبار سنجی

```typescript
const zarinpalVerify = await this.easypayService.verify({
  driver: "ZARINPAL",
  options: {
    amount: 20000,
    authority: "",
    merchantId: "",
    sandbox: true,
  },
});
```

#### استعلام وضعیت پرداخت

```typescript
const zarinpalInquiry = await this.easypayService.inquiry({
  driver: "ZARINPAL",
  options: {
    authority: "",
    merchantId: "",
    sandbox: true,
  },
});
```

## درگاه‌های پشتیبانی‌شده

- زرین‌ پال (ZarinPal)
- زیبال (Zibal)
- نوین پال (Novinpal)

ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی
