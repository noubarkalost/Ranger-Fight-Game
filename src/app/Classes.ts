interface IRanger {
  name: string
  power: number
}

export class Ranger implements IRanger {
  name: string
  power: number = 100
  intervalId: number | undefined;

  constructor(name: string) {
    this.name = name
  }

  printName() {
    console.log(this.name, this.power)
  }

  startFight() {
    let random = Math.floor(Math.random() * (20))
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
