export interface IRanger {
  name: string;
  power: number;
  startFight: (num?: number) => void;
  onStop: (intervalId: number) => void;
}

export abstract class Ranger implements IRanger {
  name: string = "Anonymous Ranger"
  power: number = 90


  protected constructor(name: string, power: number) {
    this.name = name
    this.power = power

  }


  startFight(): void {
    let random = Math.floor(Math.random() * (20))
    this.power -= random
    if (Math.sign(this.power) === -1) {
      this.power = 0
    }
  }

  private printName(): void {
    console.log(this.name, this.power)
  }

  onStop(intervalId: number): void {
    this.printName()
    setTimeout(() => {
      clearInterval(intervalId)
    }, 3000)
  }

}


export class RangerOne extends Ranger implements IRanger {
  constructor(name: string, power: number) {
    super(name, power);
    this.power = power
    this.name = name
  }

  startFight(num?: number): void {
    if (num === undefined) {
      super.startFight()
    } else {
      let random = Math.floor(Math.random() * (20))
      this.power -= random
      if (Math.sign(this.power) === -1) {
        this.power = 0

      }

    }
  }

}
