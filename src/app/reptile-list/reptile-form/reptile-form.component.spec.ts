import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileFormComponent } from './reptile-form.component';

describe('ReptileFormComponent', () => {
  let component: ReptileFormComponent;
  let fixture: ComponentFixture<ReptileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReptileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
