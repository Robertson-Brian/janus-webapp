import { AssociateListComponent } from './associate-list.component';
import { AssociateService } from '../../services/associates-service/associates-service';
import { RequestService } from '../../services/request-service/request.service';
import { Associate } from '../../models/associate.model';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { User } from '../../models/user.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AssociateSearchByTextFilter } from '../../pipes/associate-search-by-text-filter/associate-search-by-text-filter.pipes';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';
// import { RootComponent } from '../root/root.component';
// import { HomeComponent } from '../home/home.component';

class MockAssociateService {
}

// Mock Request Service
export class MockRequestService {
  public associateList: Associate[] = [];
  public associate1: Associate;
  public associate2: Associate;
  public associate3: Associate;

  public clientList: Client[] = [];
  public client1: Client;

  constructor() {
    this.associate1 = new Associate();
    this.associate1.firstName = 'MockName1';
    this.associate1.client = 'MockClient1';
    this.associate1.batchName = 'null';
    this.associate1.curriculumName = 'null';
    this.associateList.push(this.associate1);

    this.associate2 = new Associate();
    this.associate2.firstName = 'MockName2';
    this.associate2.client = 'MockClient2';
    this.associate2.batchName = 'MockBackName2';
    this.associate2.curriculumName = '';
    this.associateList.push(this.associate2);

    this.associate3 = new Associate();
    this.associate3.firstName = 'MockName3';
    this.associate3.client = 'MockClient3';
    this.associate3.batchName = 'MockBackName3';
    this.associate3.curriculumName = 'MockCurriculumName3';
    this.associateList.push(this.associate3);

    this.client1 = new Client();
    this.client1.name = 'MockClient1';
    this.clientList.push(this.client1);
    }

    /**
     * These 2 functions are called on ngOnInit in AssociateListComponent
     * so I need to have these for the 1 test I have
     */
    public getAssociates(): Observable<any> {
      return Observable.of(this.associateList);
    }

    public getClients(): Observable<any> {
      return Observable.of(this.clientList);
    }
}

describe('AssociateListComponent', () => {
    let comp: AssociateListComponent;
    let associateService: AssociateService;
    let requestService: RequestService;
    let fixture: ComponentFixture<AssociateListComponent>;
    const testAuthService: AuthenticationService = new AuthenticationService(null, null);

    beforeAll(() => {
      const user: User = new User();
      user.username = 'mockUser';
      spyOn(testAuthService, 'getUser').and.returnValue(user);  // needed by navbar
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          AssociateListComponent,
          AssociateSearchByTextFilter,
          NavbarComponent,
          // RootComponent,
          // HomeComponent
        ],
        imports: [
          // HttpClientTestingModule,
          FormsModule,
          RouterTestingModule,
          // ChartsModule
        ],
        providers: [
          AssociateService,
          // ClientListService,
          RequestService,
          { provide: AssociateService, useClass: MockAssociateService },
          { provide: RequestService, useClass: MockRequestService },
          { provide: AuthenticationService, useValue: testAuthService }
        ]
      });
      fixture = TestBed.createComponent(AssociateListComponent);
      comp = fixture.componentInstance;
      associateService = TestBed.get(AssociateService);
      requestService = TestBed.get(RequestService);
    });

    afterEach(() => {
      comp = null;
      associateService = null;
      requestService = null;
    });

    // After ngOnInit associates array should not be undefined
    it('associates array should not be undefined', () => {
      comp.ngOnInit();
      expect(comp.associates).not.toBeUndefined();
    });

    // After ngOnInit associates array should contain mock associateList data
    it('associates array should contain associateList', () => {
      comp.ngOnInit();
      expect(comp.associates[0].firstName).toEqual('MockName1');
      expect(comp.associates[1].firstName).toEqual('MockName2');
      expect(comp.associates[2].firstName).toEqual('MockName3');
    });

    // After ngOnInit client array should not be undefined
    it('client array should not be undefined', () => {
      comp.ngOnInit();
      expect(comp.clients).not.toBeUndefined();
    });

    // After ngOnInit client array should contain mock clientList data
    it('client array should contain clientList', () => {
      comp.ngOnInit();
      expect(comp.clients[0].name).toEqual('MockClient1');
    });

    // After ngOnInit() desc = true, sortedColumn = 'id', direction = 1, update = false
    it('after ngOnInit() desc should be true, sortedColumn should be id, updated should be false', () => {
      comp.ngOnInit();
      expect(comp.desc).toEqual(true);
      expect(comp.sortedColumn).toEqual('id');
      expect(comp.updated).toEqual(false);
    });

    // If sort is run with property equal to sortedColumn and update is true should change back to false
    it('sort method with update = true should change update back to false', () => {
      comp.ngOnInit();
      comp.updated = true;
      comp.sortedColumn = 'firstName';
      comp.sort('firstName');

      expect(comp.updated).toEqual(false);
    });

    // it('myTest', () => {
    //   comp.ngOnInit();
    //   expect()
    // });

    /* If url length = 8 then searchByStatus should be url[6].toUpperCase() + ',  ' + url[7].toUpperCase() */

    /* If url length = 8 and url[4] = 'client, searchByClient should be url[5]
       and searchByStatus should be url[6].toUpperCase() + ',  ' + url[7].toUpperCase() */

    /* If url length = 8 and url[5] = 'curriculum', searchByCurriculum should be url[5]
       and searchByStatus should be url[6].toUpperCase() + ',  ' + url[7].toUpperCase() */

    /* If url length is not equal to 8, searchByClient = '', searchByCurriculum = '', searchByStatus = '' */

    // Associate batchName should be 'None' if it is null
    it('batchName of associate array should be None if null', () => {
      comp.getAllAssociates();
      expect(comp.associates[0].batchName).toBe('None');
    });

    // Curriculums set should contain curriculumName and not contain '' or null
    it('curriculum set should contain curriculumName and not contain empty space or null', () => {
      comp.getAllAssociates();
      expect(comp.curriculums).not.toContain('');
      expect(comp.curriculums).not.toContain('null');
      expect(comp.curriculums).toContain('MockCurriculumName3');
    });

    /**
     * HTML Testing
     */

    // updateAssociates() should be called on click update
    it('updateAssociates() should be called on click of button update', () => {

    });

    // SearchByText should be equal to value typed in
    // it('Entering searchByText should change the value in component', () => {

    // });
});
