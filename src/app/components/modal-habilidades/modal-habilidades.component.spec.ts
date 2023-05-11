import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHabilidadesComponent } from './modal-habilidades.component';

describe('ModalHabilidadesComponent', () => {
  let component: ModalHabilidadesComponent;
  let fixture: ComponentFixture<ModalHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
