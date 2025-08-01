import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 3000;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl('');
  public mensagemErro = '';
  public livrosResultado: LivrosResultado;

  constructor(private readonly livroService: LivroService) {}

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    catchError(erro => {
      console.log(erro);
      return of();
    })
  );

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    tap((retornoAPI) => console.log('Fluxo inicial', retornoAPI)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação.';
      // return EMPTY;
      console.log(erro);
      return throwError(
        () =>
          new Error(
            (this.mensagemErro =
              'Ops, ocorreu um erro. Recarregue a aplicação.')
          )
      );
    })
  );

  private livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
