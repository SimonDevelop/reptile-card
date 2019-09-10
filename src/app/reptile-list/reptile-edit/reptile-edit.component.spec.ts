import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileEditComponent } from './reptile-edit.component';

describe('ReptileEditComponent', () => {
  let component: ReptileEditComponent;
  let fixture: ComponentFixture<ReptileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReptileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
