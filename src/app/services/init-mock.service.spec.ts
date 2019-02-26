import { TestBed } from '@angular/core/testing';

import { InitMockService } from './init-mock.service';

describe('InitMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitMockService = TestBed.get(InitMockService);
    expect(service).toBeTruthy();
  });
});
