import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { IntroductionComponent } from './introduction.component';
import { TagService } from '../../services/tag/tag.service';
import { ScreeningService } from '../../services/screening/screening.service';


fdescribe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  //
  fit('updateTagList({tagId: 1, tagName: test}, true)', 
      inject([IntroductionComponent, TagService], (comp: IntroductionComponent, service: TagService) =>
    {
      comp.updateTagList({tagId: 1, tagName: 'test'}, true);
      expect(service.tagListChecked.pop()).toEqual({tagId: 1, tagName: 'test'}, true);
    }));


    fit('updateTagList({tagId:2, tagName: test2}, false)',
    inject([IntroductionComponent,TagService], (comp:IntroductionComponent, service:TagService) =>
  {

    var Tag = ['tagId:2', 'tagName:test2'];
    comp.updateTagList(this.Tag, false);
    
    expect(service.tagListChecked.indexOf(this.Tag)).toEqual(-1);
  
  }));

  fit('skillChosen',
  inject([IntroductionComponent,TagService], (comp: IntroductionComponent, service:TagService) =>
{
  service.tagListChecked.length = 9;
expect(comp.skillChosen()).toBeFalsy();

}));

fit('skillChosen',
  inject([IntroductionComponent,TagService], (comp: IntroductionComponent, service:TagService) =>
{
  service.tagListChecked.length = 0;
expect(comp.skillChosen()).toBeTruthy();

}));


});


