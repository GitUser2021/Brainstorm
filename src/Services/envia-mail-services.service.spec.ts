import { TestBed } from '@angular/core/testing';

import { EnviaMailServicesService } from './envia-mail-services.service';

describe('EnviaMailServicesService', () => {
  let service: EnviaMailServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviaMailServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
