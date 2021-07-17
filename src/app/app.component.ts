import { Component } from '@angular/core';
import { RangerOne, RangerTwo} from "./Classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startOrContinue: string = "Start Fight"
  theWinner: string = ""
  rangerOne : any = {power:0}
  rangerTwo : any = {power: 0}
  timerID : any = 0
  isStarted: boolean = false
  isGeneratedOne: boolean = false
  isGeneratedTwo: boolean = false
  toResetGame : boolean = true
  onHandleGenRangerOne(){
    const ranger = new RangerOne("Noubar", 100)
    this.rangerOne = ranger
    ranger.printName()
    this.isGeneratedOne = true
  }
  onHandleGenRangerTwo(){
    const ranger = new RangerTwo("Sako", 100)
    this.rangerTwo = ranger
    ranger.printName()
    this.isGeneratedTwo = true
  }
  onHandleStartFight(){
    this.isStarted = true
    this.rangerTwo.startFight(5)
    this.rangerOne.startFight(4)
    this.timerID = setInterval(() => {
      this.rangerTwo.startFight()
      this.rangerOne.startFight(20)
      if(!this.rangerOne.power) {
        clearInterval(this.timerID)
        this.theWinner = this.rangerTwo.name
      }
      if(!this.rangerTwo.power) {
        this.toResetGame = false
        this.theWinner = this.rangerOne.name
        clearInterval(this.timerID)

       }
      console.log(`The Ranger  ${this.rangerOne.name}'s Power is  ${this.rangerOne.power}`)
      console.log(`The Ranger  ${this.rangerTwo.name}'s Power is  ${this.rangerTwo.power}`)

    }, 1000)

  }
  onHandleStop() {
    this.rangerOne.onStop(this.timerID)
    this.rangerTwo.onStop(this.timerID)

    setTimeout(()=>
    {this.isStarted = false
      this.toResetGame = false
      this.startOrContinue = "Continue Fight"
      if(this.rangerOne.power > this.rangerTwo.power){
        this.theWinner = this.rangerOne.name
      }
      else{
        this.theWinner = this.rangerTwo.name

      }
    },3000)

  }
  onPlayAgain(){
    this.startOrContinue = "Start Fight"
    this.isStarted = false
    this.rangerOne = {}
    this.rangerTwo = {}
    this.isGeneratedOne = false
    this.isGeneratedTwo = false
    this.theWinner = ""
  }

}
