import { Component, OnInit } from '@angular/core';
import { Produto } from './model/produto.model';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit {
  public produto: Produto = new Produto();

  public nome?: string;
  public descricao?: string;
  public preco?: number;
  public loading?: boolean;
  public mensagem?: string;

  public constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = params.get('id');
      if (id == null) return;
      this.produtoService.buscarPorId(id).subscribe(produto => {
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.preco = produto.preco;
      })
    })
  }

  salvar() {
    this.mensagem = "";
    this.loading = true;
    this.produto.nome = this.nome;
    this.produto.descricao = this.descricao;
    this.produto.preco = this.preco;
    this.produtoService.salvar(this.produto).subscribe(produto => {
      console.log(produto);
      this.mensagem = `Produto ${produto.id} salvo com sucesso`;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
      this.mensagem = `Erro: ${error.message}`;
    });
  }

}
