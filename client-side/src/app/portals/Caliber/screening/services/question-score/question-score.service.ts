import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionScore } from '../../entities/questionScore';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UrlUtilService } from '../UrlUtil/url-util.service';

/*
Exchanges data between QuestionBank (the table) and Question (the modal) components.
*/
@Injectable()
export class QuestionScoreService {

  constructor(private httpClient: HttpClient,
              private urlUtil: UrlUtilService) { }

  // Used for sharing data between question table and answer modal
  questionScores: QuestionScore[] = [];

  // questionsQuestionsSource tracks the value of answeredQuestions
  // and allows values to be sent to answeredQuestions
  private questionScoresSource = new BehaviorSubject<QuestionScore[]>(this.questionScores);

  // used to retrieve populate answeredQuestions in the data table component
  // and answer modal component
  currentQuestionScores = this.questionScoresSource.asObservable();

  //update the array of answered questions
  updateQuestionScores(questionScores: QuestionScore[]){
    this.questionScoresSource.next(questionScores);
  }

  // save the question to the database
  postQuestionScore(question: QuestionScore): void{
    const url = this.urlUtil.getBase() + '/question-score-service/question/score';

    this.httpClient.post<QuestionScore>(url, {
      Score: question.score,
      Comment: question.commentary,
      QuestionID: question.questionId,
      BeginTime: question.beginTime,
      ScreeningID: question.screeningID}).subscribe(data => {
      });

    /*
      return this.httpClient.post<QuestionScore>(url, {
      Score: question.score,
      Comment: question.commentary,
      QuestionID: question.questionId,
      BeginTime: question.beginTime,
      ScreeningID: question.screeningID
      });
    */
  }
}
