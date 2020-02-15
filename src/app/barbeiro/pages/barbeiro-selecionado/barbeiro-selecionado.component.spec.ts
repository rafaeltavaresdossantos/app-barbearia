import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarbeiroSelecionadoComponent } from './barbeiro-selecionado.component';

describe('BarbeiroSelecionadoComponent', () => {
  let component: BarbeiroSelecionadoComponent;
  let fixture: ComponentFixture<BarbeiroSelecionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbeiroSelecionadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarbeiroSelecionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
