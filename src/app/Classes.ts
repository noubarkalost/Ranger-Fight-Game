export interface IRanger {
  name: string;
  power: number;
  printName: () => void
  startFight: (num: number) => void;
  onStop: (intervalId: number) => void;
}

export abstract class Ranger implements IRanger {
  name: string = ''
  abstract power: number = 0

  protected constructor(name: string) {
    this.name = name
  }

  printName(): void {
    console.log(this.name, this.power)
  }

  startFight(num: number): void {
    let random = Math.floor(Math.random() * (num))
    this.power -= random
    if (Math.sign(this.power) === -1) {
      this.power = 0
    }
  }

  onStop(intervalId: number): void {
    setTimeout(() => {
      clearInterval(intervalId)
    }, 3000)
  }
}

export class RangerOne extends Ranger implements IRanger {
  constructor(name: string, power: number) {
    super(name);
    this.power = power
  }

  startFight(num: number) {
    super.startFight(num || 20);
  }

  power: number;

}

export class RangerTwo extends RangerOne {
  constructor(name: string, power: number = 100) {
    super(name, power);

  }

}
