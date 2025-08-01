import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl('');

  constructor(private readonly livroService: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((items) => this.livrosResultadoParaLivros(items)),
    tap(() => console.log('Requisições ao servidor')),
  );

  private livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
