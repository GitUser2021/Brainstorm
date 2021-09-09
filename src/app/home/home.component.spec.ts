import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CREACIÓN COMPONENTE:', () => {
    expect(component).toBeTruthy();
  });

  it('BOTON EPISODIOS: Debe tener un link a la ruta /episodios',()=>{
    const btnEpisodios =  fixture.debugElement.nativeElement.querySelector('.btn-episodios');
    expect(btnEpisodios.getAttribute('routerlink')).toBe('/episodios')
  })
  
  it('BOTON PERSONAJES: Debe tener un link a la ruta /personajes',()=>{
    const btnPersonajes =  fixture.debugElement.nativeElement.querySelector('.btn-personajes');
    expect(btnPersonajes.getAttribute('routerlink')).toBe('/personajes')
  })

  it('IMAGEN MENÚ: Debe tener una imagen con extension .jpg',()=>{
    const imagenMenu =  fixture.debugElement.nativeElement.querySelector('img');
    expect(imagenMenu.getAttribute('src')).toContain('.jpg')
  })
});
