import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GasStationPage } from './gas-station.page';

describe('GasStationPage', () => {
  let component: GasStationPage;
  let fixture: ComponentFixture<GasStationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GasStationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
