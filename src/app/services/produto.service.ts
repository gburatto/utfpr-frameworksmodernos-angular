import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../produto/model/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.httpClient.post('http://localhost:8080/api/produto', produto);
  }

  listar(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>('http://localhost:8080/api/produto');
  }

  buscarPorId(id: string | null): Observable<Produto> {
    return this.httpClient.get<Produto>(`http://localhost:8080/api/produto/${id}`);
  }

}
