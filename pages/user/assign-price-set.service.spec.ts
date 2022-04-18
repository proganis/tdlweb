import { TestBed } from '@angular/core/testing';

import { AssignPriceSetService } from './assign-price-set.service';

describe('AssignPriceSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignPriceSetService = TestBed.get(AssignPriceSetService);
    expect(service).toBeTruthy();
  });
});
