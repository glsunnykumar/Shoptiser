import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatLvl1ListComponent } from './cat-lvl1-list.component';

describe('CatLvl1ListComponent', () => {
  let component: CatLvl1ListComponent;
  let fixture: ComponentFixture<CatLvl1ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLvl1ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatLvl1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
