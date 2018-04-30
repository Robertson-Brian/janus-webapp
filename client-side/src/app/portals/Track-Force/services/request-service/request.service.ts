import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User} from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';

@Injectable()
export class RequestService {

  host: string = environment.url;
  trackPath: string = this.host + 'TrackForce/track';
  dataPath: string = this.host + 'TrackForce/track/data/get';

  constructor(private http: HttpClient, private us: UrlService) { }

  public populateDB(): Observable<any> {
    return this.http.get(this.host + 'TrackForce/track/database/populateDB');
    // cannot replicate
  }

  public populateDBSF(): Observable<any> {
    return this.http.get(this.host + 'TrackForce/track/database/populateDBSF');
    // cannot replicate
  }

  public deleteDB(): Observable<any> {
    return this.http.delete(this.host + 'TrackForce/track/database/deleteFromDB');
    // cannot replicate
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.host + 'TrackForce/track/user/submit', { username: username, password: password });
    // deprecated
  }

  public getUsername(): Observable<any> {
    return this.http.get<any>(this.host + 'TrackForce/track/user/name');
    // deprecated
  }

  public updateAssociates(): Observable<any> {
    return this.http.post<any>(this.trackPath + '/data/update/associate', {});
    // ???
  }

  public getAssociates(): Observable<any> {
    // return this.http.get(this.dataPath + '/associate');
    return this.http.get(this.us.users.getAllAssociatesUrl());
  }

  public getBatchesSortedById(): Observable<any> {
    // return this.http.get(this.dataPath + '/batch');
    return this.http.get(this.us.batches.fetchAll());
    // sort logic
  }

  public getBatchesSortedByDate(): Observable<any> {
    // return this.http.get(this.dataPath + '/batch/date');
    return this.http.get(this.us.batches.fetchAll());
    // sort logic
  }

  public getClients(): Observable<any> {
    return this.http.get(this.dataPath + '/client');
    // cannot replicate
  }

  public getTotals(): Observable<any> {
    return this.http.get(this.dataPath + '/summary');
    // cannot replicate
  }

  public getSkills(): Observable<any> {
    // return this.http.get(this.dataPath + '/skills');
    return this.http.get(this.us.skills.findAll());

  }

  public getStatuses(): Observable<any> {
    return this.http.get(this.dataPath + '/marketing');
    // cannot replicate
  }

  public getBatches(threeMonthsBefore: number, threeMonthsAfter: number): Observable<any> {
    // return this.http.get<any>(this.host + 'TrackForce/track/batches/' + threeMonthsBefore + '/' + threeMonthsAfter);
    return this.http.get(this.us.batches.fetchAll());
    // range logic
  }

  public getBatchPerType(threeMonthsBefore: number, threeMonthsAfter: number): Observable<any> {
    // return this.http.get<any>(this.host + 'TrackForce/track/batches/' + threeMonthsBefore + '/' + threeMonthsAfter + '/type');
    return this.http.get(this.us.batches.fetchAll());
    // range logic
    // sort logic
  }

  public createUser(username: string, password: string, roleId: number): Observable<any> {
    return this.http.post<any>(this.host + 'TrackForce/track/create/user', {username: username, password: password, role: roleId});
    // cannot replicate
  }

    // get first match of Client Object
    getOneClient(clientId: number): Observable<any> {
      return this.http.get(this.trackPath + '/clients/' + clientId);
      // cannot replicate
    }

}
