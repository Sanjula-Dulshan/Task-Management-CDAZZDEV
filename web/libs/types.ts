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

export interface ITaskProps {
  item: ITask;
  handleComplete: (taskId: string) => void;
  handleDelete: (taskId: string) => void;
  isCompleted: boolean;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  done?: boolean;
  updatedAt?: string;
}
