// export type TResponse<T = any> = {
//   statusCode: number;
//   message: string;
//   data: T;
// };
// zod/response.typeschema.ts
export type TResponse<T> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      data?: null;
    };

