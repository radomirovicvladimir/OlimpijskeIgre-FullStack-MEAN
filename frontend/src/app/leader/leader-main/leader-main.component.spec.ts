import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderMainComponent } from './leader-main.component';

describe('LeaderMainComponent', () => {
  let component: LeaderMainComponent;
  let fixture: ComponentFixture<LeaderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
