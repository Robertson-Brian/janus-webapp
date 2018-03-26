import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { SkillTypeBucketLookUp } from '../../entities/skillTypeBucketLookup';
import { SKILL_TYPE_BUCKET_LOOKUPS } from '../../mock-data/mock-skillTypeBucketLookup';

@Injectable()
export class SkillTypeBucketService {
  private ROOT_URL: string = "http://localhost:8080/bucket";
  constructor(private httpClient: HttpClient) { }

  /*
  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return this.httpClient.get<SkillTypeBucketLookUp>(this.ROOT_URL + `/${skillTypeID}`);
  }
  */

  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return of(SKILL_TYPE_BUCKET_LOOKUPS);
  }
}
