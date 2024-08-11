import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/model/produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrl: './listar-produto.component.css'
})
export class ListarProdutoComponent implements OnInit{

  public produtos: Produto [] = [];

  public constructor(private produtoService: ProdutoService,
    private router: Router) {};

  ngOnInit(): void {
    this.produtoService.listar().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  carregar(produto: Produto) {
    this.router.navigate([`/produto/${produto.id}`]);
  }

}
