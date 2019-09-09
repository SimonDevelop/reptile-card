import { TestBed } from '@angular/core/testing';

import { ReptilesService } from './reptiles.service';

describe('ReptilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReptilesService = TestBed.get(ReptilesService);
    expect(service).toBeTruthy();
  });
});
