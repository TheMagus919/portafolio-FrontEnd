import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoperfilmodalComponent } from './fotoperfilmodal.component';

describe('FotoperfilmodalComponent', () => {
  let component: FotoperfilmodalComponent;
  let fixture: ComponentFixture<FotoperfilmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoperfilmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoperfilmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
