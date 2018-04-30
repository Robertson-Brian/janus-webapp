import { TestBed, inject } from '@angular/core/testing';
import { QCStatusService } from './qcstatus.service';
import { Dependencies } from '../caliber.test.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

fdescribe('QCStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QCStatusService]
    });
  });

  it('should be created', inject([QCStatusService], (service: QCStatusService) => {
    expect(service).toBeTruthy();
  }));

  // test for getList() - need to revisit for endpoint testing
  it('getList() should return an observable', inject([QCStatusService], (service: QCStatusService) => {
    expect(service.getList()).toBeTruthy();
    const listS: Observable<string[]> = service.getList();
  }));

  // test for fetchAll() - need to revisit for endpoint testing
  it('fetchAll() should return an observable', inject([QCStatusService], (service: QCStatusService) => {
    service.fetchAll().subscribe((obs) => {
      expect(obs).toBeTruthy();
    });
  }));

});

