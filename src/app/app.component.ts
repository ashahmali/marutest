import { Component } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Question } from './question.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  formValid: boolean = true;
  currentPage: number = 1;
  questions: Question[] = [
    {
      page: 1,
      text: "Please tell us your age?",
      answers: [
        "Under 18",
        "18 - 30",
        "31 - 45",
        "46 - 60",
        "60+",
      ],
      chosen: "",
      type: "radio"
    },
    {
      page: 2,
      text: "From the following list which of these animals is your favorite?",
      answers: [
        "Rabbit",
        "Cat",
        "Dog",
        "Goldfish",
      ],
      chosen: {},
      type: "check"
    },
    {
      page: 3,
      text: "What do you like about ",
      answers: [],
      chosen: "",
      type: "text"
    }
  ];
  title = 'survey';

  gotoNextPage(form: NgForm) {
    const vldt = Object.keys(this.questions[this.currentPage - 1].chosen).length;
    if (!vldt) {
      this.formValid = false;
      return;
    }
    const lastPage = this.questions.length;
    if (this.currentPage < lastPage) this.currentPage++;
    this.formValid = true;
  }
  gotoPreviousPage(form: NgForm) {
    const lastPage = this.questions.length;
    if (this.currentPage >= 1) this.currentPage--;
  }

  submitAnswers(form: NgForm) {
    if (form.invalid) {
      this.formValid = false;
      alert("Please answer all question")
      return;
    }
    alert(this.getAnswers())

  }
  getAnswers(): string {
    // this just to hold arbitraty key value pair
    let result: any = {}
    this.questions.map((question: Question) => {
      result[question.page] = this.getSelectedOptions(question);
    })
    return JSON.stringify(result)
  }

  formatAnswer(prefix: string, question: Question) {
    return prefix + ' ' + this.getSelectedOptions(question);
  }
  getSelectedOptions(question: Question) {
    if(typeof question.chosen == 'string') return question.chosen
    let selectOptions = [];
    for (let [key, value] of Object.entries(question.chosen)) {
      if (!!value) {
        selectOptions.push(question.answers[key]);
      }
    }
    return selectOptions.join(', ')
  }
}
