import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { ScheduledScreening } from "../../entities/scheduleScreening";
import { UrlUtilService } from "../UrlUtil/url-util.service";
import { SkillTypeService } from "../../services/skillType/skill-type.service";
import { SkillType } from '../../entities/skillType';

@Injectable()
export class ScheduleScreeningService {
  constructor(
    private httpClient: HttpClient,
    private urlUtilService: UrlUtilService,
    private skillTypeService: SkillTypeService,
  ) { }

  getScheduleScreenings(): Observable<ScheduledScreening[]> {
    let scheduledScreenings: ScheduledScreening[] = [];
    this.skillTypeService.getSkillTypes().subscribe(allSkillTypes => {
      this.httpClient.get<any[]>(this.urlUtilService.getBase() + "/screening-service/screening/scheduledScreenings").subscribe(allScheduledScreenings => {
        for (let e of allScheduledScreenings) {
          // Each simpleTrainee get random skillType
          // Parse name into first and last name
          let nameArray = e.trainee.name.split(" ");
          let thisLastName: string = '';
          let thisFirstName: string = '';
          let i = 0;
          let commaFound: boolean = false;
          for (let n of nameArray) {
            if (n.charAt(n.length - 1) == ',') {
              commaFound = true;
              for (let j = 0; j <= i; j++) {
                // Add spaces between multiple lastnames
                thisLastName += nameArray[j] + " ";
              }
              // Remove last space, and comma
              thisLastName = thisLastName.trim();
              thisLastName = thisLastName.substring(0, thisLastName.length - 1);
              for (let j = i + 1; j <= nameArray.length - 1; j++) {
                thisFirstName += nameArray[j] + " ";
              }
              thisFirstName = thisFirstName.trim();
            }
            i++;
          }
          if (!commaFound) {
            thisFirstName = nameArray[0];
            for (i = 1; i < nameArray.length; i++) {
              thisLastName += nameArray[i] + " ";
            }
            thisLastName = thisLastName.trim();
          }
          /*
          // If the record is stored with lastname first, save it backwards without the comma
          if (nameArray[0].charAt(nameArray[0].length-1) == ',') {
            thisLastName = nameArray[0].substring(0, nameArray[0].length-1);
            thisFirstName = nameArray[1];
          }
          // If there is no comma, the record was stored first name then last
          else {
            thisFirstName = nameArray[0];
            thisLastName = nameArray[1];
          }
          */
        
          let skillTypes: SkillType[] = allSkillTypes;
          let skillType: SkillType;
          for(let s of allSkillTypes) {
            if(s.skillTypeId == e.skillTypeId)
              skillType = s;
          }
          scheduledScreenings.push({
            scheduledScreeningId: e.scheduledScreeningId,
            trainee: {
              traineeID: e.trainee.traineeId,
              firstname: thisFirstName,
              lastname: thisLastName,
              skillTypeID: e.skillTypeId,
              skillTypeName: skillType.skillTypeName,
              schedule: e.scheduledDate,
            },
            track: {
              skillTypeID: e.skillTypeId,
              skillTypeName: skillType.skillTypeName,
              isActive: true,
            },
            status: e.status,
            trainer: e.trainer,
            scheduledDate: e.scheduledDate,
          });
        }
      });
    });
    return of(scheduledScreenings);
  }
}