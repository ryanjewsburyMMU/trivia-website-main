import { stringify } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { CheckboxControlValueAccessor, FormControl } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';


import Swal from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  title = "trivia-website";
  questionAmount = "10";
  displayCustomOptions = false;
  myControl = new FormControl();
  filteredOptions!:  Observable<string[]>;

  fontStyleControl = new FormControl();
  optionsChoice = "";


  currentType = "";
  type: string[] = ["Any", "Multiple", "True"];

  difficulty = "";
  difficulty_choice: string[] = ["Easy", "Medium", "Hard"];

  currentOption = ""
  options: string[] = [
    "All",
    "General Knowelege",
    "Books",
    "Film",
    "Music",
    "Musicals & Theatres",
    "Television",
    "Video Games",
    "Board Games",
    "Science & Nature",
    "Computers",
    "Maths",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebtiries",
    "Animals",
    "Vehicles",
    "Comics",
    "Gadgets",
    "Cartoons & Animations",
  ];


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value;
    this.currentOption = filterValue
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  createURL() {
    // Vars being passed into to URL
    var amount = 0
    var category = 0
    var difficulty = ""
    var type = ""

    // Check That amount is a number
    if (
      !isNaN(Number(this.questionAmount)) && Number(this.questionAmount) > 0 && Number(this.questionAmount) <= 50 ) {
        amount = Number(this.questionAmount)
        console.log("AMOUNT VALIDATED:  " + amount)

        // Choice 
        category = this.convertChoice(this.currentOption)
        console.log("CATEGORY VALIDATED: ", category)

        // Difficulty
        if (this.difficulty != ""){
          difficulty = this.difficulty.toLowerCase()
          console.log("DIFFICULTY VALIDATED ", this.difficulty)

        }

        if (this.optionsChoice != ""){
          type = this.optionsChoice
          console.log("TYPE VALIDATED ", this.optionsChoice)
        }
        // Type

        this.concatString(amount, category, difficulty, type)

    } 
    else {
      Swal.fire("Oops!","Please Ensure You Have Selected an Amount of Questions Between 1-50", "error");
      return;
    }
  }

  displayOptions() {
    this.displayCustomOptions = !this.displayCustomOptions;
  }

  concatString(amount: Number, category: Number, difficulty: String, type: String){
    var url: String
    // Add amount on 
    url = "https://opentdb.com/api.php?amount=" + amount

    // Adding category
    if (category == 1){
      // do nothing
    }
    if (category != 0 && category != 1 ){
      url += "&category=" + String(category)
    }

     // Adding difficulty
    if (difficulty == ""){
      // do nothing
    }
    if (difficulty != ""){
      url += "&difficulty=" + difficulty
    }

    if (type == "any"){

    }

    if (type != "" && type!= "any"){
      url += "&type=" + type
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Your Quiz Will Be Generated With Your Selected Settings",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Lets Go!!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Great!',
          'Your quiz has been generated',
          'success'
        )
        this.openQuiz(url)
      }
    })

    return url
  }



  convertChoice(choice: String){
    if (this.displayCustomOptions == true){
      this.displayOptions()
    }
    switch(choice){
      case "All": {
        return 1
      }
      case "General Knowelege":{
        return 9
      }
      case "Books":{
        return 10
      }
      case "Film":{
        return 11
      }
      case "Music":{
        return 12
      }
      case "Musicals & Theatres":{
        return 13
      }
      case "Television":{
        return 14
      }
      case "Video Games":{
        return 15
      }
      case "Board Games":{
        return 16
      }
      case "Science & Nature":{
        return 17
      }
      case "Computers":{
        return 18
      }
      case "Maths":{
        return 19
      }
      case "Mythology":{
        return 20
      }
      case "Sports":{
        return 21
      }
      case "Geography":{
        return 22
      }
      case "History":{
        return 23
      }
      case "Politics":{
        return 24
      }
      case "Art":{
        return 25
      }
      case "Celebtiries":{
        return 26
      } 
      case "Animals":{
        return 27
      }
      case "Vehicles":{
        return 28
      }
      case "Comics":{
        return 29
      }
      case "Gadgets":{
        return 30
      }
      case "Cartoons & Animations":{
        return 32
      }
      default: {
        return 1
      }
    }

  }

  openQuiz(curl: String){
    this.router.navigate(['/quiz'],
         {queryParams: {url: curl}});
  }

}