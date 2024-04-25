export interface IAxiosError {
  data: any;
  error: { message: string }[];
  success: boolean;
  message: string;
}
