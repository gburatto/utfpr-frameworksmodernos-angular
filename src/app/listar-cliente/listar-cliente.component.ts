import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente/model/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent implements OnInit{

  public clientes: Cliente [] = [];

  public constructor(private clienteService: ClienteService,
    private router: Router) {};

  ngOnInit(): void {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  carregar(cliente: Cliente) {
    this.router.navigate([`/cliente/${cliente.id}`]);
  }

}
