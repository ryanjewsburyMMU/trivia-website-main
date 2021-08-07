import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component'
import {QuizComponent} from '../../src/app/quiz/quiz.component'


const routes: Routes = [
   {path: 'quiz', component: QuizComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
