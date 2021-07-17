interface IRanger {
  name: string
  power: number
}

export class Ranger implements IRanger {
  name: string = ''
  power: number = 0
  intervalId: number | undefined;

  constructor() {

  }

  printName() {
    console.log(this.name, this.power)
  }

  startFight(num: number) {
    let random = Math.floor(Math.random() * (num))
    this.power -= random
    if (Math.sign(this.power) === -1) {
      this.power = 0
    }
  }

  onStop(intervalId:number) {
    setTimeout(() => {
      clearInterval(intervalId)
    }, 3000)
  }
}

export class RangerOne extends Ranger{
  name: string
  power: number
  constructor(name:string,power: number) {
    super();
    this.power = power || 100
    this.name = name
  }
 startFight(num: number) {
   super.startFight(num || 20);
 }

}
export class RangerTwo extends RangerOne{
  constructor(name: string,power: number = 100) {
    super(name,power);
    this.power = power || 100
    this.name = name
  }

}
