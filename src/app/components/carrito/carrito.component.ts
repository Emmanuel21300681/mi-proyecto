import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private router: Router  // Inyecta el servicio Router
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  generarXML() {
    this.carritoService.descargaXML();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  // Método para agregar una unidad más del mismo producto al carrito
  agregarMas(index: number) {
    const producto = this.carrito[index];
    this.carritoService.agregarProducto(producto); // Agrega el mismo producto nuevamente al carrito
  }

  // Redirigir al catálogo usando Router
  irAlCatalogo() {
    this.router.navigate(['/']); // Redirige al catálogo (ruta principal)
  }
}
