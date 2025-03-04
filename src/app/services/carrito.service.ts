// carrito.service.ts
import { Injectable } from "@angular/core";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class CarritoService {
    private carrito: Producto[] = [];

    eliminarProducto(index: number) {
        if (index >= 0 && index < this.carrito.length) {
            this.carrito.splice(index, 1);
        }
    }

    agregarProducto(producto: Producto) {
        this.carrito.push(producto);
    }

    obtenerCarrito(): Producto[] {
        return this.carrito;
    }

    generarXML(): string {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<Factura>\n';
        xml += '  <Encabezado>\n';
        xml += '    <Emisor>\n';
        xml += '      <Nombre>Empresa</Nombre>\n';
        xml += '      <RFC>123</RFC>\n';
        xml += '      <Direccion>Calle cualquiera</Direccion>\n';
        xml += '    </Emisor>\n';
        xml += '    <Receptor>\n';
        xml += '      <Nombre>Juan</Nombre>\n';
        xml += '    </Receptor>\n';
        xml += '    <Fecha>' + new Date().toISOString().split('T')[0] + '</Fecha>\n';
        xml += '    <NoFactura>001</NoFactura>\n';
        xml += '  </Encabezado>\n';
        xml += '  <Detalles>\n';

        this.carrito.forEach((producto) => {
            xml += '    <Item>\n';
            xml += '      <Descripcion>' + producto.nombre + '</Descripcion>\n';
            xml += '      <Cantidad>1</Cantidad>\n';
            xml += '      <PrecioUnitario>' + producto.precio + '</PrecioUnitario>\n';
            xml += '      <Subtotal>' + producto.precio + '</Subtotal>\n';
            xml += '    </Item>\n';
        });

        xml += '  </Detalles>\n';
        xml += '  <Totales>\n';
        xml += '    <Subtotal>' + this.carrito.reduce((sum, producto) => sum + producto.precio, 0) + '</Subtotal>\n';
        xml += '    <Impuestos>0</Impuestos>\n';
        xml += '    <Total>' + this.carrito.reduce((sum, producto) => sum + producto.precio, 0) + '</Total>\n';
        xml += '  </Totales>\n';
        xml += '</Factura>';

        return xml;
    }

    descargaXML(): void {
        const xmlContent = this.generarXML();
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'factura.xml';
        a.click();

        // Limpiar el objeto URL después de la descarga
        URL.revokeObjectURL(url);
    }
}