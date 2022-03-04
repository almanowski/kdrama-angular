import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DramaCardComponent } from './drama-card.component';

describe('DramaCardComponent', () => {
  let component: DramaCardComponent;
  let fixture: ComponentFixture<DramaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DramaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DramaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
