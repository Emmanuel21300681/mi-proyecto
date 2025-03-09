import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private xmlUrl = 'assets/productos.xml';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  obtenerProducto(): Observable<Producto[]> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Running on server (SSR), returning empty array');
      return of([]);
    }

    console.log('Fetching XML from:', this.xmlUrl);
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map((xml: string) => {
        console.log('Raw XML:', xml);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');
        const productos = Array.from(xmlDoc.getElementsByTagName('producto')).map((prod) => {
          const idElement = prod.getElementsByTagName('id')[0];
          const precioElement = prod.getElementsByTagName('precio')[0];
          const nombreElement = prod.getElementsByTagName('nombre')[0];
          const imagenElement = prod.getElementsByTagName('imagen')[0];

          const id = idElement && idElement.textContent ? +idElement.textContent : 0;
          const precio = precioElement && precioElement.textContent ? +precioElement.textContent : 0;
          const nombre = nombreElement && nombreElement.textContent ? nombreElement.textContent : 'Producto sin nombre';
          const imagen = imagenElement && imagenElement.textContent ? imagenElement.textContent : '/assets/default.jpg'; // Default image in public/assets/

          return new Producto(id, nombre, precio, imagen);
        });
        console.log('Parsed Products:', productos);
        return productos;
      })
    );
  }
}