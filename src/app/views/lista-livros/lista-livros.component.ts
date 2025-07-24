import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  public campoBusca = '';

  listaLivros: [];

  constructor(private readonly livroService: LivroService) {}

  public buscarLivros() {
    this.livroService.buscar(this.campoBusca).subscribe((retornoAPI) => {
      console.log(retornoAPI),
        (error) => {
          console.log(error);
        };
    });
  }
}
