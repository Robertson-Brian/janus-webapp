import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../entities/Question';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  /** https://hydra-question-service.cfapps.io/ **/
  url: string = "https://hydra-gateway-service.cfapps.io/question-service/question/";
  questions: Question[];

  createNewQuestion(bucketId: number, question: Question, tagIds: number[]){
    let theAnswers: string[]=[question.sampleAnswer1, question.sampleAnswer2, question.sampleAnswer3,question.sampleAnswer4,question.sampleAnswer5];
    console.log(theAnswers);
    return this.http.post(this.url + "createQuestion", {bucketId: bucketId, text: question.questionText, answers: theAnswers,tagIds:tagIds}, httpOptions);
  }

  updateQuestion(bucketId: number, question: Question, tagIds: number[]){
    let theAnswers: string[]=[question.sampleAnswer1, question.sampleAnswer2, question.sampleAnswer3,question.sampleAnswer4,question.sampleAnswer5];
    console.log(theAnswers);
    return this.http.post(this.url + "updateQuestion", {question : question,tagIds:tagIds}, httpOptions);
}

  deactivateQuestion(questionId: number){
    return this.http.put(this.url + "deactivateQuestion/" + questionId, httpOptions);
  }

  activateQuestion(questionId: number){
    return this.http.put(this.url + "activateQuestion/" + questionId, httpOptions);
  }

  getBucketQuestions(bucketId: number){
    return this.http.get(this.url + "bucketQuestions/" + bucketId);
  }
}
