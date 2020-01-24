import { TestBed } from '@angular/core/testing';

import { ReleaseManagementService } from './release-management.service';

describe('ReleaseManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReleaseManagementService = TestBed.get(ReleaseManagementService);
    expect(service).toBeTruthy();
  });
});
