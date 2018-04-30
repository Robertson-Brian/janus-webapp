import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AlertsService } from './alerts.service';
import { NoteService } from './note.service';

fdescribe('NoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        NoteService,
        HttpClient,
        AlertsService
      ]
    });
  });

  it('should be created', inject([NoteService], (service: NoteService) => {
    expect(service).toBeTruthy();
  }));

  // need to revist these for endpoint testing

  // test for getTraineeList()
  it('getTraineeList() should return an observable', inject([NoteService], (service: NoteService) => {
    expect(service.getTraineeList()).toBeTruthy();
  }));

  // test for getList()
  it('getList() should return an observable', inject([NoteService], (service: NoteService) => {
    expect(service.getList()).toBeTruthy();
  }));

  // test for fetchByBatchIdByWeek(id, week)
  it('fetchByBatchIdByWeek()', inject([NoteService], (service: NoteService) => {
    service.fetchByBatchIdByWeek(1, 1);
    expect(service['listSubject']).toBeTruthy();
  }));

});
