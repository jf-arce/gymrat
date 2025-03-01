import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export class ErrorHandler extends Error {
  private type: keyof typeof HttpStatus;

  private constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(message);
    this.type = type;
  }

  static newError({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    return new ErrorHandler({ type, message });
  }

  static throwError(error: any) {
    if (error instanceof HttpException) {
      return error;
    }

    if (error instanceof ErrorHandler) {
      const { type, message } = error;
      return new HttpException(message, HttpStatus[type]);
    }

    if (error instanceof Error) {
      return new InternalServerErrorException(error.message);
    }

    return new InternalServerErrorException('Internal Server Error');
  }
}
