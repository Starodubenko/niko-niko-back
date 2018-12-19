import { NikoNikoBaseError } from '../../core/error/NikoNikoBaseError';

export abstract class NikoNikoDBError extends NikoNikoBaseError {
  constructor(message: string) {
    super('DataBase', message);
  }
}
