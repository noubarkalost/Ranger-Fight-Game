export interface IRanger {
  name: string;
  power: number;
  startFight: (num: number) => void;
  onStop: (intervalId: number) => void;
}

export abstract class Ranger implements IRanger {
  name: string = ''
  abstract power: number

  protected constructor(name: string) {
    this.name = name
  }


  startFight(num: number): void {
    let random = Math.floor(Math.random() * (num))
    this.power -= random
    if (Math.sign(this.power) === -1) {
      this.power = 0
    }
  }

  onStop(intervalId: number): void {

  }
}

export class RangerOne extends Ranger implements IRanger {
  constructor(name: string, power: number) {
    super(name);
    this.power = power
  }


   private printName(): void {
    console.log(this.name, this.power)
  }
  startFight(num: number) {
    super.startFight(num || 20);
    this.printName()
  }
  onStop(intervalId: number) {
    setTimeout(() => {
      clearInterval(intervalId)
    }, 3000)
  }

  power: number;

}

export class RangerTwo extends RangerOne {
  constructor(name: string, power: number = 100) {
    super(name, power);

  }

}
