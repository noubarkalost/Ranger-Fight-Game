import { Component } from '@angular/core';
import {Ranger} from "./Classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rangerOne : any = {}
  rangerTwo : any = {}
  timerID : any = 0
  onHandleGenRangerOne(){
    const ranger = new Ranger("noubar")
    this.rangerOne = ranger
    ranger.printName()
  }
  onHandleGenRangerTwo(){
    const ranger = new Ranger("sako")
    this.rangerTwo = ranger
    ranger.printName()
  }
  onHandleStartFight(){

    this.rangerTwo.startFight()
    this.rangerOne.startFight()
    this.timerID = setInterval(() => {


      this.rangerTwo.startFight()
      this.rangerOne.startFight()
      if(!this.rangerOne.power) {
        clearInterval(this.timerID)
      }
      if(!this.rangerTwo.power) {


        clearInterval(this.timerID)
      }
      console.log(`The Ranger  ${this.rangerOne.name}'s Power is  ${this.rangerOne.power}`)
      console.log(`The Ranger  ${this.rangerTwo.name}'s Power is  ${this.rangerTwo.power}`)
      if(parseInt(this.rangerTwo.power ) === 0){
        alert(this.rangerOne.name + "wins")
      }
      else if(parseInt(this.rangerOne.power ) === 0){
        alert(this.rangerTwo.name + "wins")
      }else if(parseInt(this.rangerTwo.power ) === 0 && parseInt(this.rangerOne.power ) === 0 ) {
        alert('Draw')
      }
    }, 1000)




  }
  onHandleStop() {
    this.rangerOne.onStop(this.timerID)
    this.rangerTwo.onStop(this.timerID)
  }
}
