import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionEstadoComponent } from './creacion-estado.component';

describe('CreacionEstadoComponent', () => {
  let component: CreacionEstadoComponent;
  let fixture: ComponentFixture<CreacionEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
