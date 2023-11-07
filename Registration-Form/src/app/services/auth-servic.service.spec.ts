import { TestBed } from '@angular/core/testing';

import { AuthServicService } from './auth-servic.service';

describe('AuthServicService', () => {
  let service: AuthServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
