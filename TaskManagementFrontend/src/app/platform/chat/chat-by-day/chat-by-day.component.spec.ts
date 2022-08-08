import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatByDayComponent } from './chat-by-day.component';

describe('ChatByDayComponent', () => {
  let component: ChatByDayComponent;
  let fixture: ComponentFixture<ChatByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatByDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
