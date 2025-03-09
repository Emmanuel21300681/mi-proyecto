import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto'; // Adjust the path

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  generarXML() {
    this.carritoService.descargaXML();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  agregarMas(index: number) {
    const producto = this.carrito[index];
    this.carritoService.agregarProducto(producto);
  }

  irAlCatalogo() {
    this.router.navigate(['/']);
  }
}