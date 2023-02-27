import { IService } from "core/Service/Service.interfaces";
import { signJWT } from "utils/signJWT";
import { compareNumbers } from "utils/compareNumbers";

class Service implements IService {
  srotage: string[][] = [];

  public set(query: string[]): string[] {
    const sort = query.sort(compareNumbers);
    console.log(sort.length.toString());
    this.srotage.push(sort);
    return sort;
  }

  public get(): string[][] {
    return this.srotage;
  }

  public generateJWT(): string {
    return signJWT();
  }
}

export { Service };
