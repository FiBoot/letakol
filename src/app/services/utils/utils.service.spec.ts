import { TestBed } from '@angular/core/testing';

import { Utils } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Utils = TestBed.get(Utils);
    expect(service).toBeTruthy();
  });
});
