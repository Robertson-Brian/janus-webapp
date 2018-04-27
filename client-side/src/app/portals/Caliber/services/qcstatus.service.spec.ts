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

  // test for getList()
  it('getList() should return an observable', inject([QCStatusService], (service: QCStatusService) => {
    expect(service.getList()).toBeTruthy();
    const listS: Observable<string[]> = service.getList();
  }));

  // test for fetchAll()
  it('fetchAll() should return an observable', inject([QCStatusService], (service: QCStatusService) => {
    service.fetchAll().subscribe((obs) => {
      expect(obs).toBeTruthy();
    });
  }));

});

