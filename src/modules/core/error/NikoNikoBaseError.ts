export abstract class NikoNikoBaseError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }
}
