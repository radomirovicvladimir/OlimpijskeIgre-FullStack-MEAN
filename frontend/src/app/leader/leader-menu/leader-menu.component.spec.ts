import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderMenuComponent } from './leader-menu.component';

describe('LeaderMenuComponent', () => {
  let component: LeaderMenuComponent;
  let fixture: ComponentFixture<LeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
