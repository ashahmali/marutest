export interface Question {
  page:number;
  text:string;
  answers: any;
  // chosen can be string to hold string values or an arbitrary
  // object to hold checkbox responses
  chosen:any;
  type:string;

}

