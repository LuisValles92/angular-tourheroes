import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  /*
    El HeroesComponent consume el resultado getHeroes() como si los héroes pudieran ser recuperados sincrónicamente.
    Ahora te saldrás con la tuya porque el servicio actualmente devuelve héroes simulados. 
    Pero pronto la aplicación buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.
    El HeroService debe esperar a que el servidor responda, getHeroes() no puede regresar inmediatamente 
    con los datos del héroe, y el navegador no se bloqueará mientras el servicio espere.
    HeroService.getHeroes() debe tener una firma asíncrona de algún tipo.
    En este tutorial, HeroService.getHeroes() devolverá un Observable porque eventualmente usará el método angular 
    HttpClient.get para buscar a los héroes y HttpClient.get() devuelve un Observable.
    Método sincronizado
    getHeroes(): Hero[] {
      return HEROES;
    }
  */

  //Método asíncrono
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
