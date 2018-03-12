import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Building} from '../domain/building';
import {Observable} from 'rxjs/Observable';
import {UrlService} from './url.service';

@Injectable()
export class BuildingService {

  url = this.urlService.getUrl() + '/api/location/api/v2/building';

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  /** Get all buidings from the building service */
  getAll(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.url}`);
  }

  /** Get a building from the building service */
  getById(id): Observable<Building> {
    return this.http.get<Building>(`${this.url}/${id}`);
  }

  /** Add a new building to the building service */
  create(building: Building): Observable<any> {
    return this.http.post<any>(`${this.url}`, building);
  }

  /** Update a building on the building service */
  update(building: Building): Observable<any> {
    return this.http.put<any>(`${this.url}`, building);
  }

  /** Delete a building from the building service */
  delete(building: Building): Observable<any> {
    return this.http.delete<any>(`${this.url}/${building.id}`);
  }
}
