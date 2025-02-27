import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class HandleError {
  static throw(error: any) {
    if (error instanceof CustomError) {
      return new HttpException(error.message, error.statusCode);
    }
    if (error instanceof Error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
