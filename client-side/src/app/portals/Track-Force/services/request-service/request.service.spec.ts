import { TestBed, inject } from '@angular/core/testing';
import { Associate } from '../../models/associate.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { RequestService } from './request.service';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('RequestService', () => {

    const assoc = new Associate();
    const assoc1 = new Associate();
    const assocList = new Array();


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RequestService, HttpHandler, HttpClient]
        });
    });

    beforeAll(() => {
        assoc.batchId = '111';
        assoc.batchName = 'TestBatch';
        assoc.bid = 111;
        assoc.clid = 222;
        assoc.client = 'TestClient';
        assoc.curid = 333;
        assoc.curriculumName = 'TestCurriculum';
        assoc.ecid = 444;
        assoc.endClientName = 'TestEndClient';
        assoc.firstName = 'FirstName';
        assoc.id = 555;
        assoc.lastName = 'LastName';
        assoc.marketingStatus = 'TestStatus';
        assoc.msid = 666;
        assocList.push(assoc1);
        assocList.push(assoc1);
        assocList.push(assoc);
        // assocList.push(null);
        // assocList.push(undefined);
    });

    it('should be created', inject([RequestService], (service: RequestService) => {
        expect(service).toBeTruthy();
    }));

    // Testing populateDB()

    it('should return valid database objects', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.populateDB();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing populateDBSF()

    it('should return valid SF objects', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.populateDBSF();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing deleteDB()

    //   it('should truncate the database', inject([RequestService], (service: RequestService) => {
    //     // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
    //     const retVal = service.deleteDB();
    //     expect(retVal).toBeDefined();
    //     expect(retVal).not.toBeUndefined();
    //     expect(retVal).toEqual(jasmine.any(Observable));
    //     expect(retVal instanceof Observable).toBe(true);
    //     retVal.subscribe(res => {
    //         expect(res).not.toContain(null);
    //         expect(res).not.toContain(undefined);
    //     });
    //   }));

    // Testing login

    //   it('should return a valid User if proper login information is provided', inject([RequestService], (service: RequestService) => {
    //     // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
    //     const retVal = service.login('username', 'password');
    //     expect(retVal).toBeDefined();
    //     expect(retVal).not.toBeUndefined();
    //     expect(retVal).toEqual(jasmine.any(Observable));
    //     expect(retVal instanceof Observable).toBe(true);
    //     retVal.subscribe(res => {
    //         expect(res).not.toContain(null);
    //         expect(res).not.toContain(undefined);
    //     });
    //   }));

    //   it('should not return a valid User if improper login information is provided',
    // inject([RequestService], (service: RequestService) => {
    //     // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
    //     const retVal = service.login('username', 'password');
    //     expect(retVal).toBeDefined();
    //     expect(retVal).not.toBeUndefined();
    //     expect(retVal).toEqual(jasmine.any(Observable));
    //     expect(retVal instanceof Observable).toBe(true);
    //     retVal.subscribe(res => {
    //         expect(res).not.toContain(null);
    //         expect(res).not.toContain(undefined);
    //     });
    //   }));

    // Testing getUsername()

    it('should return a valid username', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getUsername();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing updateAssociates()

    it('should return valid updated associates', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.updateAssociates();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing getAssociates

    it('should return valid associate objects', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getAssociates();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    it('should return a valid list of batches sorted by batchID', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getBatchesSortedById();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
            let batchID = 0;
            res.forEach(element => {
                if (batchID !== 0) {
                    expect(element.bid).toBeGreaterThanOrEqual(batchID);
                }
                batchID = element.bid;
            });
        });
    }));

    // Testing getBatchesSortedByDate()

    //   it('should return a valid list of batches sorted by date', inject([RequestService], (service: RequestService) => {
    //     // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
    //     const retVal = service.getBatchesSortedByDate();
    //     expect(retVal).toBeDefined();
    //     expect(retVal).not.toBeUndefined();
    //     expect(retVal).toEqual(jasmine.any(Observable));
    //     expect(retVal instanceof Observable).toBe(true);
    //     retVal.subscribe(res => {
    //         expect(res).not.toContain(null);
    //         expect(res).not.toContain(undefined);
    //         let date = new Date(0);
    //         res.forEach(element => {
    //             if (date !== 0) {
    //                 expect(element.bid).toBeGreaterThanOrEqual(date);
    //             }
    //             date = element.bid;
    //         });
    //     });
    //   }));

    // Testing getClients()

    it('should return a valid list of clients', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getClients();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing getTotals

    it('should return a valid list of totals', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getTotals();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing getSkills()

    it('should return a valid list of skills', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getSkills();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing getStatuses()

    it('should return a valid list of statuses', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getStatuses();
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing getBatches()

    // it('should return a valid list of batches in a six-month range', inject([RequestService], (service: RequestService) => {
    //     // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
    //     const retVal = service.getBatches(0, 0);
    //     expect(retVal).toBeDefined();
    //     expect(retVal).not.toBeUndefined();
    //     expect(retVal).toEqual(jasmine.any(Observable));
    //     expect(retVal instanceof Observable).toBe(true);
    //     retVal.subscribe(res => {
    //         expect(res).not.toContain(null);
    //         expect(res).not.toContain(undefined);
    //     });
    // }));

    // Testing getBatchPerType()

    it('should return a valid list of batches in a six-month range by type', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getBatchPerType(0, 0);
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // Testing createUser

    it('should return a valid user if a new username is provided', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.createUser('username', 'password', 0);
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    it('should not return a valid user if an existing username is provided', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.createUser('username', 'password', 0);
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

    // testing getOneClient()

    it('should return a valid client object', inject([RequestService], (service: RequestService) => {
        // spyOn(service, 'getAssociates').and.returnValue(Observable.of(assocList));
        const retVal = service.getOneClient(0);
        expect(retVal).toBeDefined();
        expect(retVal).not.toBeUndefined();
        expect(retVal).toEqual(jasmine.any(Observable));
        expect(retVal instanceof Observable).toBe(true);
        retVal.subscribe(res => {
            expect(res).not.toContain(null);
            expect(res).not.toContain(undefined);
        });
    }));

});
