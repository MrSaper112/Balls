import { timeOfDecorater } from "./const";

export class Decorators {
  public static timeout(ob: Object, name: string, desc: PropertyDescriptor) {
    let oryg = desc.value;
    desc.value = function (...args: any[]) {
      console.log("Dekoruje");
      setTimeout(() => {
        console.log(this, args);
        return oryg.apply(this, args);
      }, timeOfDecorater);
    };
  }
}
