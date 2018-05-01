import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsetComponent } from './skillset.component';
import { SelectedStatusConstants } from '../../constants/selected-status.constants';
import { element, by, browser } from 'protractor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartsModule } from 'ng2-charts';
import { RootComponent } from '../root/root.component';
import { HomeComponent } from '../home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SkillsetService } from '../../services/skill-set-service/skill-set.service';

import { FormComponent } from '../form-component/form.component';

import {
  ActivatedRoute, ActivatedRouteStub, Router, RouterStub
} from '../../testing-helpers/router-stubs';

describe('Undefined Checker', () => {
  it('should return true if value is not undefined', () => {
    expect(SkillsetComponent.isNotUndefined({ 'rakdos': ['black', 'red'] })).toBe(true);
  });

  it('should return false if value is undefined', () => {
    expect(SkillsetComponent.isNotUndefined(undefined)).toBe(false);
  });
});


describe('SkillsetComponent', () => {
  let component: SkillsetComponent;
  let fixture: ComponentFixture<SkillsetComponent>;
  let activatedRoute: ActivatedRouteStub;
  // let ssServiceSpy: jasmine.SpyObj<SkillsetService>;
    class SkillsetServiceSpy {

    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SkillsetComponent, RootComponent, HomeComponent, NavbarComponent,
          FormComponent
        ],
        imports : [
          HttpClientTestingModule,
          ChartsModule,
          RouterTestingModule
        ],
        providers : [
          SkillsetService,
          { provide : ActivatedRoute, useValue : activatedRoute },
          { provide : Router,         useClass : RouterStub }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      fixture = TestBed.createComponent(SkillsetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a non-empty map of skill info', () => {
      expect(SkillsetComponent.getSkillInfo()).toBeTruthy();
      expect(SkillsetComponent.getSkillInfo().size).toBeGreaterThan(0);
    });

  describe('Change Chart Type', () => {
    it('should be able to change chartTypes', () => {
      component.changeChartType('pie');
      expect(component.chartType).toBe(SkillsetComponent.chartTypes.PIE);
    });

    it(`it shouldn't change to a nonexistent chartType`, () => {
      const chartType: string = component.chartType;
      component.changeChartType('rakdos');
      expect(component.chartType).toBe(chartType);
    });
  });

  describe('displaying chart type', () => {
    xit(`should display the chart of the chosen type`, () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector(`app-${component.chartType}`)).not.toBe(null);
    });

    describe('displaying chart type when chosen type changed', () => {
      let compiled;
      // let xcompiled; // MARK: 1
      let chartType: string;
      it(`shouldn't be displaying pie chart right now (will change to pie chart)`, () => {
        chartType = component.chartType;
        expect(chartType).not.toBe('pie'); // Sanity Check
      });
      it(`shouldn't display the original chart type`, () => {
        component.changeChartType('pie');
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        // xcompiled = compiled; // MARK: 1
        // expect(xcompiled).toBe(compiled); // MARK: 1
        expect(compiled.querySelector(`app-${component.chartType}`)).toBeNull();
      });
      // it(`should not change compiled`, () => { // MARK: 1
      //   expect(compiled).toBe(xcompiled); // MARK: 1
      // }); // MARK: 1
      xit('should display pie chart', () => {
        expect(compiled.querySelector('app-pie')).not.toBeNull();
      });
    });
  });

  describe('Buttons that change chart type', () => {
    it('should have buttons that trigger changeChartType()', () => {
      // click each of the buttons
      const chartChangeButtons = fixture.nativeElement.querySelector('.btn.btn-default');
      let i = 0;
      for (const btn of chartChangeButtons) {
        // sanity testing the buttons to make sure they are actual buttons and not indices of some array
        expect(btn).toBeNaN();
        expect(btn.click).not.toBeUndefined();
        // clicking the buttons
        btn.click().then((data) => {
          // on click, changeChartType should invoke
          // TODO: find way to check the data itself
          expect(component.changeChartType).toHaveBeenCalledTimes(++i);

        });
      }
    });

    describe('displaying chart type when chosen type button clicked', () => {
      let compiled;
      let chartType: string;
      // let xchartType: string; // MARK: 2
      it(`shouldn't be displaying pie chart right now (will change to pie chart)`, () => {
        chartType = component.chartType;
        expect(chartType).not.toBe('pie'); // Sanity Check
      });
      xit(`shouldn't display the original chart type`, () => {
        fixture.nativeElement.querySelector('#pie-btn').click();
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance; // MARK: 2
        // xchartType = component.chartType; // MARK: 2
        compiled = fixture.debugElement.nativeElement;
        // expect(xchartType).not.toBe(chartType); // Testing the test MARK: 2
        expect(compiled.querySelector(`app-${component.chartType}`)).toBeNull();
      });
      xit('should display pie chart', () => {
        // expect(xchartType).toBe('pie'); // MARK: 2
        expect(compiled.querySelector('app-pie')).not.toBeNull();
      });
    });
  });



  /*  it('should not be using DUMMY_DATA', () => {
      // waiting on the observable in ngOnInit() to finish ...
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.skillsetData).not.toEqual(component.DUMMY_DATA);
      })
      // making sure that the skillsetData is now equal to the results of the data returned from SkillsetService
      .then(() => {
        let service : SkillsetService = TestBed.get(SkillsetService);
        service.getSkillsetsForStatusID(1).subscribe((res) => {
          expect(component.skillsetData).toEqual(res.data.map((obj) => obj.count))
        })
        .unsubscribe()
      })
    });
    xit('should have one-to-one relation between skillsetData and skillsetLabels', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.skillsetData.length).toBeTruthy();
        expect(component.skillsetLabels.length).toBeTruthy();
        expect(component.skillsetLabels.length).toEqual(component.skillsetData.length);
      })
    })
    */
});
