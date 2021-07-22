import { Component } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  formValid: boolean = true;
  currentPage:number = 1;
  questions:any = [
    {
      page: 1,
      text: "Please tell us your age?",
      answers: [
        {0:"Under 18"},
        {1:"18 - 30"},
        {2:"31 - 45"},
        {3:"46 - 60"},
        {4:"60+"},
      ],
      chosen: "",
      type: "radio"
    },
    {
      page: 2,
      text: "From the following list which of these animals is your favorite?",
      answers: [
        {0:"Rabbit"},
        {1:"Cat"},
        {2:"Dog"},
        {3:"Goldfish"},
      ],
      chosen: {},
      type:"check"
    },
    {
      page: 3,
      text: "What do you like about ",
      answers: [],
      chosen: "",
      type:"text"
    }
  ];
  title = 'survey';

  gotoNextPage(form: NgForm){
    const vldt = Object.keys(this.questions[this.currentPage-1].chosen).length;
    if(!vldt){
      this.formValid = false;
      return;
    }
    const lastPage = this.questions.length;
    if(this.currentPage<lastPage) this.currentPage++;
    this.formValid = true;
  }
  gotoPreviousPage(form: NgForm){
    const lastPage = this.questions.length;
    if(this.currentPage>=1) this.currentPage--;
  }

  submitAnswers(form: NgForm){
    if (form.invalid) {
      this.formValid = false;
      alert("Please answer all question")
      return;
    }
    alert(this.getAnswers())

  }
  getAnswers(): any {
    let result:any = {}
    this.questions.map((question:any)=>{
      result[question.page] = this.getSelectedOptions(question);
    })
    return JSON.stringify(result)
  }

  formatAnswer(prefix:string, question: any){
    return prefix + ' ' + this.getSelectedOptions(question);
  }
  getSelectedOptions(question: any) {
    if(typeof question.chosen == 'string') return question.chosen
    let selectOptions = [];
    for (let [key, value] of Object.entries(question.chosen)) {
      if (!!value) {
        selectOptions.push(Object.values(question.answers[key]))
      }
    }
    return selectOptions.join(', ')
  }
}
