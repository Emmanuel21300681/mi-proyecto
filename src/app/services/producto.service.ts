import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productos:Producto[]=[
    new Producto (1,'Jersey Chivas 24/25',1,'assets/chivas.jpg'),
    new Producto (2,'Balon Americano Junior',1500,'assets/americano.jpg'),
    new Producto (3,'Jersey Cowboys Local',3200,'assets/vaqueros.jpg'),
  ];
  obtenerProducto():Producto[]{
     return this.productos;
  }
  
}
