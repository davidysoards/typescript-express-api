export default class HttpException extends Error {
  status?: number;
  statusCode?: number;
  message: string;
  error: string | null;
  constructor(statusCode: number, status: number, message: string, error?: string) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}
