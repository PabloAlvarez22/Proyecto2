import { TestBed } from '@angular/core/testing';

import { RestShoesService } from './rest-shoes.service';

describe('RestShoesService', () => {
  let service: RestShoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestShoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
