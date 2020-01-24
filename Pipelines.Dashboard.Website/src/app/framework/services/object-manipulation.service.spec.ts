import { TestBed } from '@angular/core/testing';

import { ObjectManipulationService } from './object-manipulation.service';

describe('ObjectManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectManipulationService = TestBed.get(ObjectManipulationService);
    expect(service).toBeTruthy();
  });
});
