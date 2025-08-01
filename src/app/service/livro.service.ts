import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volume';

  constructor(private httpClient: HttpClient) {}

  public buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.httpClient.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Retorno API: ', retornoAPI)),
      map((resultado) => resultado.items),
      tap((resulato) => console.log('Resultado após map: ', resulato))
    );
  }
}
