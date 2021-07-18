import { Component } from '@angular/core';
import { RangerOne, RangerTwo} from "./Classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  awaitMessage: string = ""
  startOrContinue: string = "Start Fight"
  theWinner: string = "The Result Will Appear Here, Generate Players To Start"
  rangerOne : any = { power:0}
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
    if(this.isGeneratedOne && this.isGeneratedTwo){
      this.theWinner = "The Result Will Appear Here, You Can Start The Combat"
    }
  }
  onHandleGenRangerTwo(){
    const ranger = new RangerTwo("Sako", 100)
    this.rangerTwo = ranger
    ranger.printName()
    this.isGeneratedTwo = true
    if(this.isGeneratedOne && this.isGeneratedTwo){
      this.theWinner = "The Result Will Appear Here, You Can Start The Combat"
    }

  }
  onHandleStartFight(){
    this.theWinner = "Press Stop Fight Or Wait The Result"
    this.isStarted = true
    this.toResetGame = true
    this.rangerTwo.startFight(5)
    this.rangerOne.startFight(4)
    this.timerID = setInterval(() => {
      console.log(`The Ranger  ${this.rangerOne.name}'s Power is  ${this.rangerOne.power}`)
      console.log(`The Ranger  ${this.rangerTwo.name}'s Power is  ${this.rangerTwo.power}`)
      this.rangerTwo.startFight()
      this.rangerOne.startFight(20)
      if(!this.rangerOne.power) {
        this.toResetGame = false
        this.isStarted = false
        clearInterval(this.timerID)
        this.theWinner = "Is: " + this.rangerTwo.name + " ! .. Please Generate Players To Play Again Or Reset The Game"
        console.log(`The Winner is ${this.theWinner}, Please Generate Players To Play Again Or Reset The Game`)
        this.isGeneratedTwo = false
        this.isGeneratedOne = false
        this.startOrContinue = "Start Fight"
      }
      if(!this.rangerTwo.power) {
        this.isStarted = false
        this.toResetGame = false
        this.theWinner = "Is: " + this.rangerOne.name + " ! .. Please Generate Players To Play Again Or Reset The Game"
        console.log(`The Winner is ${this.theWinner}, Please Generate Players To Play Again Or Reset The Game`)
        this.isGeneratedTwo = false
        this.isGeneratedOne = false
        this.startOrContinue = "Start Fight"
        clearInterval(this.timerID)

       }


    }, 1000)

  }
  onHandleStop() {
    this.awaitMessage = "Please Wait 3 Seconds For The Game To Stop In Order To See The Initial Result"
    this.theWinner = this.awaitMessage
    this.rangerOne.onStop(this.timerID)
    this.rangerTwo.onStop(this.timerID)


    setTimeout(()=>
    {this.isStarted = false
      this.toResetGame = false
      this.startOrContinue = "Continue Fight"
      if(this.rangerOne.power > this.rangerTwo.power){
        this.theWinner = "For Now Is: " + this.rangerOne.name + " ! .. Press Continue Fight To Change The Result"
        console.log(`The Winner For Now Is ${this.theWinner}, Press Continue Fight To Change The Result`)

      }
      else if (this.rangerOne.power < this.rangerTwo.power){
        this.theWinner = "For Now Is: " + this.rangerTwo.name + " ! .. Press Continue Fight To Change The Result"
        console.log(`The Winner For Now Is ${this.theWinner}, Press Continue Fight To Change The Result`)
    }
      else if (this.rangerOne.power == this.rangerTwo.power){
        this.theWinner = "Is The Math )) .. Press Continue Fight To Change The Result "
        console.log(`The Winner For Now IS ${this.theWinner}, Press Continue Fight To Change The Result`)

      }
    },3000)


  }
  onPlayAgain(){
    console.log("Please Wait 3 Seconds To Play Again")
    setTimeout(()=>{
      this.startOrContinue = "Start Fight"
      this.isStarted = false
      this.rangerOne = {}
      this.rangerTwo = {}
      this.isGeneratedOne = false
      this.isGeneratedTwo = false
      this.theWinner = ""
    },3000)

  }

}
