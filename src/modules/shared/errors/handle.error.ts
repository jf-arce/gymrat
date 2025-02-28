import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class HandleError {
  static throwError(error: any) {
    if (error instanceof CustomError) {
      throw new HttpException(error.message, error.statusCode);
    }
    if (error instanceof HttpException) {
      throw new HttpException(error.message, error.getStatus());
    }
    if (error instanceof Error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
