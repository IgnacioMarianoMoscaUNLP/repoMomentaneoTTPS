import { TestBed } from '@angular/core/testing';

import { MenuServicePruebasService } from './menu-service-pruebas.service';

describe('MenuServicePruebasService', () => {
  let service: MenuServicePruebasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuServicePruebasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
