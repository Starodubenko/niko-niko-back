import { NikoNikoBaseError } from './NikoNikoBaseError';

export abstract class NikoNikoAppError extends NikoNikoBaseError {
  constructor(message: string) {
    super('App', message);
  }
}
