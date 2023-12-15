export enum NOTIFICATION_TYPE {
  SUCCESS = "success",
  ERROR = "danger",
  WARNING = "warning",
  INFO = "info",
}

export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs {
  name: string;
  email: string;
  password: string;
  cPassword: string;
}
