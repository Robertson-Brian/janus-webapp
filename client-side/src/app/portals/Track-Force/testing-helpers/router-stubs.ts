// export for convenience.
/*
   Code found at https://angular.io/guide/testing#live-examples
*/
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}


// Only implements params and part of snapshot.paramMap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;

  constructor(testParamMap: ParamMap) {
    this._testParamMap = testParamMap;
    if (!this._testParamMap) {
      const defaultMap = {
        'id': '1'
      };
      const defaultTestParamMap = {
        has: function(name: string): boolean {
          return !!defaultMap[name];
        },
        get: function(name: string): string {
          return defaultMap[name];
        },
        getAll: function(name: string): string[] {
          const result: string[] = [];
          if (defaultMap[name]) {
            result.push(defaultMap[name]);
          }
          return result;
        },
        keys: Object.keys(defaultMap)
      };
      this._testParamMap = defaultTestParamMap;
    }
  }
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }
  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}


 /*
 Copyright 2017-2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
