import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  public campoBusca = '';
  listaLivros: [];
  private subscription: Subscription;

  constructor(private readonly livroService: LivroService) {}

  public buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (retornoAPI) => console.log(retornoAPI),
      error: (erro) => console.error(erro),
      complete: () => console.log('Observable completado'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
