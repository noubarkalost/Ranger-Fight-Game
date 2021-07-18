import {Component} from '@angular/core';
import {RangerOne, RangerTwo, IRanger} from "./Classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameOfAnonymous: string = "No Player"
  awaitMessage: string = ""
  startOrContinue: string = "Start Fight"
  theWinner: string = "The Result Will Appear Here, Generate Players To Start"
  rangerOne ?: IRanger | undefined = undefined;
  rangerTwo: IRanger | undefined = undefined;
  timerID: number = 0
  isStarted: boolean = false
  isGeneratedOne: boolean = false
  isGeneratedTwo: boolean = false
  toResetGame: boolean = true
  imageOne: string = "./assets/Red.jpg"
  imageTwo: string = "./assets/Blue.jpg"

  onHandleGenRangerOne() {
    const ranger: IRanger = new RangerOne("Noubar", 100)
    this.rangerOne = ranger
    ranger.printName()
    this.isGeneratedOne = true
    if (this.isGeneratedOne && this.isGeneratedTwo) {
      this.theWinner = "The Result Will Appear Here, You Can Start The Combat"
    }
  }

  onHandleGenRangerTwo() {
    const ranger = new RangerTwo("Sako", 100)
    this.rangerTwo = ranger
    ranger.printName()
    this.isGeneratedTwo = true
    if (this.isGeneratedOne && this.isGeneratedTwo) {
      this.theWinner = "The Result Will Appear Here, You Can Start The Combat"
    }

  }

  onHandleStartFight() {
    this.theWinner = "Press Stop Fight To See The Initial Result Or Wait For The Battle To Finish"
    this.isStarted = true
    this.toResetGame = true
    this?.rangerTwo?.startFight(5)
    this?.rangerOne?.startFight(4)
    this.timerID = setInterval(() => {
      this?.rangerTwo?.startFight(20)
      this?.rangerOne?.startFight(20)
      if (!this?.rangerOne?.power) {
        this.imageOne = "./assets/RedDead.gif"
        this.toResetGame = false
        this.isStarted = false
        clearInterval(this.timerID)
        this.theWinner = "The Winner Is: " + this?.rangerTwo?.name + " ! .. Please Generate Players To Play Again Or Reset The Game"
        this.isGeneratedTwo = false
        this.isGeneratedOne = false
        this.startOrContinue = "Start Fight"
      } else if (!this?.rangerTwo?.power) {
        this.imageTwo = "./assets/BlueDead.gif"
        this.isStarted = false
        this.toResetGame = false
        this.theWinner = "The Winner Is: " + this.rangerOne.name + " ! .. Please Generate Players To Play Again Or Reset The Game"
        this.isGeneratedTwo = false
        this.isGeneratedOne = false
        this.startOrContinue = "Start Fight"
        clearInterval(this.timerID)
      } else if (!this.rangerTwo.power && !this.rangerOne.power) {
        this.theWinner = "The Winner For Now Is The Math )) .. Please Generate Players To Play Again Or Reset The Game"
      }

    }, 1000)

  }

  onHandleStop() {
    this.awaitMessage = "Please Wait 3 Seconds For The Game To Stop In Order To See The Initial Result"
    this.theWinner = this.awaitMessage
    this?.rangerOne?.onStop(this.timerID)
    this?.rangerTwo?.onStop(this.timerID)


    setTimeout(() => {
      this.isStarted = false
      this.toResetGame = false
      this.startOrContinue = "Continue Fight"
      if (this.rangerOne && this.rangerTwo && this.rangerOne.power > this.rangerTwo?.power) {
        this.theWinner = "The Winner For Now Is: " + this?.rangerOne.name + " ! .. Press Continue Fight To Change The Result"
      } else if (this.rangerOne && this.rangerTwo && this.rangerOne.power < this.rangerTwo.power) {
        this.theWinner = "The Winner For Now Is: " + this.rangerTwo.name + " ! .. Press Continue Fight To Change The Result"
      } else if (this?.rangerOne?.power == this?.rangerTwo?.power) {
        this.theWinner = "The Winner For Now Is The Math )) .. Press Continue Fight To Change The Result "
      }
    }, 3000)


  }

  onPlayAgain() {
    this.awaitMessage = "Please Wait 3 Seconds For The Game To Reset In Order To Play Again"
    this.theWinner = this.awaitMessage
    setTimeout(() => {
      this.startOrContinue = "Start Fight"
      this.isStarted = false
      this.rangerOne = undefined
      this.rangerTwo = undefined
      this.isGeneratedOne = false
      this.isGeneratedTwo = false
      this.imageOne = "./assets/Red.jpg"
      this.imageTwo = "./assets/Blue.jpg"
      this.theWinner = "The Result Will Appear Here, Generate Players To Start"
    }, 3000)

  }

}
