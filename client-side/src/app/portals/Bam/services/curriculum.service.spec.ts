import { TestBed, inject } from '@angular/core/testing';

import { CurriculumService } from './curriculum.service';

describe('CirriculumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculumService]
    });
  });

  it('should be created', inject([CurriculumService], (service: CurriculumService) => {
    expect(service).toBeTruthy();
  }));
});
