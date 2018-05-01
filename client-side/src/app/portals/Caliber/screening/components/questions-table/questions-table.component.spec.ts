import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTableComponent } from './questions-table.component';
import { FormsModule } from '@angular/forms';
import { BucketService } from '../../services/bucket/bucket.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UrlUtilService } from '../../services/UrlUtil/url-util.service';
import { QuestionService } from '../../services/question/question.service';
import { TagService } from '../../services/tag/tag.service';
import { SimpleTraineeService } from '../../services/simpleTrainee/simple-trainee.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';
import { QuestionsToBucketsUtil } from '../../util/questionsToBuckets.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { ScreeningService } from '../../services/screening/screening.service';
import { SkillTypeBucketService } from '../../services/skillTypeBucketLookup/skill-type-bucket.service';
import { Bucket } from '../../entities/bucket';
import { Question } from '../../entities/question';
import { AnswerComponent } from '../answer/answer.component';
import { ViolationFlagComponent } from '../violation-flag/violation-flag.component';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { AlertsService } from '../../../services/alerts.service';

// Author: David Gustafson

const QUESTION: Question = {
  questionId: 1,
  questionText: 'string',
  sampleAnswer1: 'string',
  sampleAnswer2: 'string',
  sampleAnswer3: 'string',
  sampleAnswer4: 'string',
  sampleAnswer5: 'string',
  isActive: true,
  bucketId: 1
};

const BUCKETS: Bucket[] = [
  {
    bucketID: 1,
    bucketCategory: 'Basic Java',
    bucketDescription: 'OCA level Java questions',
    isActive: true,
    questions: null
  },
  {
    bucketID: 2,
    bucketCategory: 'SQL',
    bucketDescription: 'SQL database questions',
    isActive: true,
    questions: null
  }];

fdescribe('QuestionsTableComponent', () => {
  let component: QuestionsTableComponent;
  let fixture: ComponentFixture<QuestionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsTableComponent, NgbModalBackdrop, NgbModalWindow, AnswerComponent, ViolationFlagComponent],
      imports: [FormsModule],
      providers: [BucketService, HttpClient, HttpHandler, UrlUtilService, QuestionService, TagService, SimpleTraineeService,
        SkillTypeService, QuestionScoreService, QuestionsToBucketsUtil, NgbModal, NgbModalStack, ScreeningService,
        SkillTypeBucketService, SoftSkillsViolationService, ViolationTypeService, AlertsService]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [QuestionsTableComponent, NgbModalBackdrop, NgbModalWindow, AnswerComponent, ViolationFlagComponent]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set questionBuckets to [] false', () => {
    component.ngOnDestroy();
    if (component.questionBuckets !== undefined) {
      for (const bucket of component.questionBuckets) {
        expect(bucket.questions).toEqual([]);
      }
    }
  });

  it('should set questionBuckets to [] true', () => {
    component.questionBuckets = BUCKETS;
    component.ngOnDestroy();
    if (component.questionBuckets !== undefined) {
      for (const bucket of component.questionBuckets) {
        expect(bucket.questions).toEqual([]);
      }
    }
  });

  it('should set currentCategory to bucket', () => {
    component.questionBuckets = BUCKETS;
    component.questionBuckets[0].bucketID = 1;
    component.setBucket(1);
    expect(component.currentCategory.bucketID).toBe(1);
  });

  it('should set run open', () => {
    const spy = spyOn(component, 'open');
    component.open(QUESTION);
    expect(spy).toHaveBeenCalled();
  });

  it('should set run open', () => {
    const spy = spyOn(component, 'open');
    component.open(QUESTION);
    expect(spy).toHaveBeenCalled();
  });

});
