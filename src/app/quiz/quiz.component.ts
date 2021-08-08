import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { fetchJson } from 'fetch-json';

import Swal from "sweetalert2";



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  url!: any;
  questionData!: any;
  public countries: any;
  show_answer = false
  show_answer_text = "Show Answers"


  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.url

  }

  ngOnInit() {
    this.activatedRoute 
        .queryParams
        .subscribe(params => {
          this.url = params['url']
        });
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'text/html',
          'Content-Type': 'text/plain; charset=utf-8'
        }),
        responseType: 'text' as 'json'
      };
    this.http.get(this.url, httpOptions).toPromise().then(data => {
      this.url = data
      this.startQuiz()
    })
    
  }

  startQuiz(){
    var obj = JSON.parse(this.url.replace("&#039;", "'").replace("&quot", "'").replace("&quot;", "'"));
    this.questionData = obj.results
    // Loop through all the data 

    for (var item in this.questionData) {
      var count = 0

      if (this.questionData.hasOwnProperty(item)) {
        var insertIn = getRandomNumberBetween(1,4)
        for (var newitme in this.questionData[item].incorrect_answers){
          console.log(count += 1)
          if (count = insertIn)
          {
            console.log("INSERTING IN HERE....")
          }
          console.log(this.questionData[item].incorrect_answers[newitme])
        }
    }
  }



  function getRandomNumberBetween(min: number,max: number){
    return Math.floor(Math.random()*(max-min+1)+min);
}

    



    // Append the correct answer randomly inside the incorrect answers 

    // Get done son 
    
  }

  showAnswer(){
    this.show_answer = !this.show_answer

    if (this.show_answer){
      this.show_answer_text =  "Hide Answers"
    }else{
      this.show_answer_text =  "Show Answers"
    }
  }

  endQuiz(){

    Swal.fire({
      title: 'Are you sure?',
      text: "Your Quiz Will Be Deleted and Ended",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Lets Go!!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Great!',
          'Your quiz has been closed',
          'success'
        )
        this.router.navigate([''])
      }
    })
  }


}
