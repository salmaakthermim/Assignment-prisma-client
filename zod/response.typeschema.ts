export type TResponse<T = any> = {
  statusCode: number;
  message: string;
  data: T;
};
