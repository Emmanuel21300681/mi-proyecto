import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']  // Corregido 'styleUrl' a 'styleUrls'
})

export class ProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Aquí puedes redirigir al carrito al cargar el componente, si es necesario
    // this.router.navigate(['/carrito']);
    
    // Cargar los productos
    this.productos = this.productoService.obtenerProducto();
  }

  agregarAlCarrito(producto: any): void {
    // Agregar el producto al carrito
    this.carritoService.agregarProducto(producto);
  }

  irAlCarrito(): void {
    // Redirigir al carrito cuando se llame a esta función
    this.router.navigate(['/carrito']);
  }
}
