import { HttpException } from '@nestjs/common';

export abstract class NikoNikoHttpError extends HttpException {
  constructor( messge: string, status) {
    super(messge, status);
  }
}
