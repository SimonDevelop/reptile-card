import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReptileComponent } from './show-reptile.component';

describe('ShowReptileComponent', () => {
  let component: ShowReptileComponent;
  let fixture: ComponentFixture<ShowReptileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReptileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReptileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
