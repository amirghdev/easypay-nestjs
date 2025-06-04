export type NovinpalError = NovinpalErrorDocumented | NovinpalErrorNotDocumented;

export interface NovinpalErrorDocumented {
  status: number;
  errorCode: number;
  errorDescription: string;
}

export interface NovinpalErrorNotDocumented {
  id: string;
  code: number;
  message: string;
  errors: Errors;
}

export interface Errors {
  [key: string]: string;
}
