import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarbeiroFilaComponent } from './barbeiro-fila.component';

describe('BarbeiroFilaComponent', () => {
  let component: BarbeiroFilaComponent;
  let fixture: ComponentFixture<BarbeiroFilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbeiroFilaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarbeiroFilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
