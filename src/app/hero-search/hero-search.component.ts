import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  /*
  debounceTime(300) espera hasta que el flujo de nuevos eventos de cadena se detenga durante 300 milisegundos antes de pasar por la última cuerda. 
  Nunca hará solicitudes con más frecuencia que 300 ms.
  distinctUntilChanged() asegura que una solicitud se envíe solo si el texto del filtro cambió.
  switchMap() llama al servicio de búsqueda para cada término de búsqueda que pasa por debounce() y distinctUntilChanged().
  Cancela (no aborta una solicitud HTTP pendiente) y descarta los observables de búsqueda anteriores, devolviendo solo el último servicio de búsqueda observable.
  */

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
