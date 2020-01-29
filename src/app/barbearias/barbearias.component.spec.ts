import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarbeariasComponent } from './barbearias.component';

describe('BarbeariasComponent', () => {
  let component: BarbeariasComponent;
  let fixture: ComponentFixture<BarbeariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbeariasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarbeariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
