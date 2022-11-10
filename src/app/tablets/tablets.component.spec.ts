import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletsComponent } from './tablets.component';

describe('TabletsComponent', () => {
  let component: TabletsComponent;
  let fixture: ComponentFixture<TabletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
