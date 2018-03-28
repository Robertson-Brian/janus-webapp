import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Screening } from "../../entities/screening";
import { UrlUtilService } from '../UrlUtil/url-util.service';
import { ScheduledScreening } from "../../entities/scheduleScreening";

@Injectable()
export class ScreeningService {
  constructor(private httpClient: HttpClient,
    private urlUtilService: UrlUtilService) {}

  // Need to change to match the backend
  private ROOT_URL: string = this.urlUtilService.getBase();
  headers = new HttpHeaders({
    "Content-type": "application/json"
  });

  public softSkillsResult: string;
  public generalComments: string;
  public screeningID$: Observable<Screening>;
  compositeScore: number;
  finalSoftSkillComment: string;

  retrieveScreening(): Observable<Screening> {
    this.screeningID$ = this.httpClient.post<Screening>("", {});
    return this.screeningID$;
  }

  beginScreening(
    scheduledScreening: ScheduledScreening,
    beginTime: Date,
    trainerId: number,
    skillTypeId: number,
  ): Observable<Number> {
    return this.httpClient
      .post<Number>(
        this.ROOT_URL + "/screening-service/screening/start",
        { "scheduledScreening": scheduledScreening, "beginTime" : beginTime, "trainerId" : trainerId, "skillTypeId" : skillTypeId },
        { headers: this.headers }
      );
  }

  getScreeningID() {
    return this.screeningID$;
  }

  endScreening(softSkillComment: string): void {
    this.httpClient.post(this.ROOT_URL + '/screening-service/screening/end', Object.assign({}, "complete", this.convertToBoolean(this.softSkillsResult), this.finalSoftSkillComment, new Date(), localStorage.getItem("screeningID"), this.compositeScore))
  }

  convertToBoolean(input: string): boolean | undefined {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return undefined;
    }
  }

  submitIntroComment(comment : string) {
    this.httpClient.post<String>(
      this.ROOT_URL + "/screening-service/screening/introcomment",
      { traineeId : localStorage.getItem("screeningID"), softSkillCommentary : comment }
    );
  }

  submitGeneralComment() {
    this.httpClient.post<String>(
      this.ROOT_URL + "/screening-service/screening/generalcomment",
      { comment : this.generalComments, screeningId : localStorage.getItem("screeningID")}
    )
  }
}
