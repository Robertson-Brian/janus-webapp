import { AssociateListComponent } from './associate-list.component';
import { AssociateService } from '../../services/associates-service/associates-service';
import { RequestService } from '../../services/request-service/request.service';
import { TestBed } from '@angular/core/testing';
import { Associate } from '../../models/associate.model';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import 'rxjs/add/observable/of';

class MockAssociateService {
}

// Mock Request Service
export class MockRequestService {
    public associateList: Associate[] = [];
    public associate1: Associate;
    public associate2: Associate;

    public clientList: Client[] = [];
    public client1: Client;

    constructor() {
        this.associate1 = new Associate();
        this.associate1.firstName = 'MockName1';
        this.associate1.client = 'MockClient1';
        this.associateList.push(this.associate1);

        this.associate2 = new Associate();
        this.associate2.firstName = 'MockName2';
        this.associate2.client = 'MockClient2';
        this.associateList.push(this.associate2);

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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AssociateListComponent,
                // since AssociateListComponent constructor depends on Associate Service
                { provide: AssociateService, useClass: MockAssociateService },
                // since AssociateListComponent constructor depends on Request Service
                { provide: RequestService, useClass: MockRequestService }
            ]
        });
        comp = TestBed.get(AssociateListComponent); // creates an instance of AssociateListComponent
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
});

// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {AssociateListComponent} from './associate-list.component';
// import {AssociateService} from '../../services/associates-service/associates-service';
// import {ClientListService} from '../../services/client-list-service/client-list.service';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {FormsModule} from '@angular/forms';
// import {AssociateSearchByTextFilter} from '../../pipes/associate-search-by-text-filter/associate-search-by-text-filter.pipes';
// import {NavbarComponent} from '../navbar/navbar.component';
// import {RouterTestingModule} from '@angular/router/testing';
// import {RootComponent} from '../root/root.component';
// import {HomeComponent} from '../home/home.component';
// import {ChartsModule} from 'ng2-charts';
// import {AuthenticationService} from '../../services/authentication-service/authentication.service';
// import {RequestService} from '../../services/request-service/request.service';
// import {User} from '../../models/user.model';
// import { AppComponent } from '../../../../app.component';
// import { Associate } from '../../models/associate.model';
// import { Client } from '../../models/client.model';


// describe('AssociateListComponent', () => {
//   let component: AssociateListComponent;
//   let fixture: ComponentFixture<AssociateListComponent>;
//   const testAuthService: AuthenticationService = new AuthenticationService(null, null);

//   const associates: Associate[] = null;
//   const clients: Client[] = null;
//   const curriculums: Set<string> = null; // stored unique curriculums

//   // setup service mocks
//    beforeAll(() => {
//     const user: User = new User();
//     user.username = 'mockUser';
//     spyOn(testAuthService, 'getUser').and.returnValue(user);  // needed by navbar
//   });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         AssociateListComponent,
//         AssociateSearchByTextFilter,
//         NavbarComponent,
//         RootComponent,
//         HomeComponent
//       ],
//       imports: [
//         HttpClientTestingModule,
//         FormsModule,
//         RouterTestingModule,
//         ChartsModule
//       ],
//       providers: [
//         AssociateService,
//         ClientListService,
//         RequestService,
//         {provide: AuthenticationService, useValue: testAuthService}
//       ]
//     });
//     fixture = TestBed.createComponent(AssociateListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//     it('should get all associates', () => {
//         spyOn(component, 'getAllAssociates');
//         component.getAllAssociates();

//         expect(component.getAllAssociates()).toHaveBeenCalled();
//     });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// });
