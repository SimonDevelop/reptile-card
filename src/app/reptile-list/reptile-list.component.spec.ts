import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileListComponent } from './reptile-list.component';

describe('ReptileListComponent', () => {
  let component: ReptileListComponent;
  let fixture: ComponentFixture<ReptileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReptileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
