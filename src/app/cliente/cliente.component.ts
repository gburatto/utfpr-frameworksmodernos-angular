import { Component, OnInit } from '@angular/core';
import { Cliente } from './model/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  public cliente: Cliente = new Cliente();

  public nome?: string;
  public email?: string;
  public loading?: boolean;
  public mensagem?: string;

  public constructor(private clienteService: ClienteService,
    private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = params.get('id');
      if (id == null) return;
      this.clienteService.buscarPorId(id).subscribe(cliente => {
        this.nome = cliente.nome;
        this.email = cliente.email;
      })
    })
  }

  salvar() {
    this.mensagem = "";
    this.loading = true;
    this.cliente.nome = this.nome;
    this.cliente.email = this.email;
    this.clienteService.salvar(this.cliente).subscribe(cliente => {
      console.log(cliente);
      this.mensagem = `Cliente ${cliente.id} salvo com sucesso`;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
      this.mensagem = `Erro: ${error.message}`;
    });
  }

}
