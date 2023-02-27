interface IService {
  set(query: string[]): string[];
  get(): string[][];
  generateJWT(): string;
}

export { IService };
