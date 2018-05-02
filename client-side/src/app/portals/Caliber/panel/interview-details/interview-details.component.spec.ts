import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InterviewDetailsComponent } from './interview-details.component';
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';
import { BatchService } from '../../../Bam/services/batch.service';
import { PanelService } from '../../services/panel.service';
import { Panel } from '../../entities/Panel';
// import { GeneralFeedbackComponent } from '../general-feedback/general-feedback.component';

fdescribe('InterviewDetailsComponent', () => {
  let component: InterviewDetailsComponent;
  let fixture: ComponentFixture<InterviewDetailsComponent>;
  const batchService = BatchService;
  const panelService = PanelService;
  const searchBar = PanelSearchbarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        InterviewDetailsComponent,
        PanelSearchbarComponent
      ],
      providers: [
        BatchService,
        PanelService,
      ]
    });

    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Batch Service is valid', () => {
    expect(batchService).toBeTruthy();
  });

  it('Panel Service is valid', () => {
    expect(panelService).toBeTruthy();
  });

  it('constructor works, and instantiates an interview form', () => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    component.panelList = [ new Panel() ];
    const spy = spyOnProperty(component, 'panelRound', 'get');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.panelRound).toEqual(component.panelList.length + 1);
  });

  it('constructor works when passed-in panelService is null', () => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    component.panelList = null;
    const spy = spyOnProperty(component, 'panelRound', 'get');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.panelRound).toEqual(1);
  });

  ////////////////////////////////////////////////////////////////////
  // ensure that all fields in this form exist
  it('interviewDate field (in interview details form) is valid.', () => {
    const interviewDate = component.interviewForm.controls['interviewDate'];
    expect(interviewDate).toBeTruthy();
    expect(interviewDate.value).toEqual('');
  });

  it('interviewTime field (in interview details form) is valid.', () => {
    const interviewTime = component.interviewForm.controls['interviewTime'];
    expect(interviewTime).toBeTruthy();
    expect(interviewTime.value).toEqual('');
  });

  it('internet field (in interview details form) is valid.', () => {
    const internet = component.interviewForm.controls['internet'];
    expect(internet).toBeTruthy();
    expect(internet.value).toEqual('');
  });

  it('panelRound field (in interview details form) is valid.', () => {
    const panelRound = component.interviewForm.controls['panelRound'];
    expect(panelRound).toBeTruthy();
    expect(panelRound.value).toEqual('');
  });

  it('format field (in interview details form) is valid.', () => {
    const format = component.interviewForm.controls['format'];
    expect(format).toBeTruthy();
    expect(format.value).toEqual('');
  });

  it('recordingConsent field (in interview details form) is valid.', () => {
    const recordingConsent = component.interviewForm.controls['recordingConsent'];
    expect(recordingConsent).toBeTruthy();
    expect(recordingConsent.value).toEqual('');
  });

  ////////////////////////////////////////////////////////////////////
  /* ensure that panelRound, field, and recordingConsent are disabled */
  it('panelRound field should be disabled.', () => {
    const panelRound = component.interviewForm.controls['panelRound'];
    expect(panelRound.enabled).toBeFalsy();
  });

  it('format field should be disabled.', () => {
    const format = component.interviewForm.controls['format'];
    expect(format.enabled).toBeFalsy();
  });

  it('recordingConsent field should be disabled.', () => {
    const recordingConsent = component.interviewForm.controls['recordingConsent'];
    expect(recordingConsent.enabled).toBeFalsy();
  });
});
