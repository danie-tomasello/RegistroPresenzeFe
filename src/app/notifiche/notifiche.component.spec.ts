import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificheComponent } from './notifiche.component';

describe('NotificheComponent', () => {
  let component: NotificheComponent;
  let fixture: ComponentFixture<NotificheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
