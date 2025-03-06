import { Injectable } from "@angular/core";
import { Producto } from "../models/producto";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = []; // Cambiado a any[] para manejar la cantidad

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
    }
  }

  agregarProducto(producto: Producto) {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  obtenerCarrito(): any[] { // Cambiado a any[]
    return this.carrito;
  }

  generarXML(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" Version="4.0" LugarExpedicion="12345" Fecha="2024-10-27T12:00:00" SubTotal="100.00" Total="116.00" TipoDeComprobante="I" Exportacion="01">\n' +
      ' <cfdi:Emisor Nombre="Mi Empresa" Rfc="AAA010101AAA" RegimenFiscal="601"/>\n' +
      ' <cfdi:Receptor Nombre="Cliente Ejemplo" Rfc="XAXX010101000" UsoCFDI="G01" DomicilioFiscalReceptor="66666"/>\n' +
      ' <cfdi:Conceptos>\n';

    this.carrito.forEach((item) => { // Cambiado para usar item.producto
      xml += ' <cfdi:Concepto ClaveProdServ="01010101" Cantidad="' + item.cantidad + '" ClaveUnidad="ACT" Descripcion="' + item.producto.nombre + '" ValorUnitario="' + item.producto.precio + '" Importe="' + (item.producto.precio * item.cantidad) + '" ObjetoImp="02">\n' +
        ' <cfdi:Impuestos>\n' +
        ' <cfdi:Traslados>\n' +
        ' <cfdi:Traslado Base="' + item.producto.precio + '" Importe="16.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000"/>\n' +
        ' </cfdi:Traslados>\n' +
        ' </cfdi:Impuestos>\n' +
        ' </cfdi:Concepto>\n';
    });

    xml += ' </cfdi:Conceptos>\n' +
      ' <cfdi:Impuestos TotalImpuestosTrasladados="16.00">\n' +
      ' <cfdi:Traslados>\n' +
      ' <cfdi:Traslado Importe="16.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000"/>\n' +
      ' </cfdi:Traslados>\n' +
      ' </cfdi:Impuestos>\n' +
      '</cfdi:Comprobante>';
    return xml;
  }

  descargaXML(): void {
    const xmlContent = this.generarXML();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();

    URL.revokeObjectURL(url);
  }

  aumentarCantidad(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito[index].cantidad++;
    }
  }

  disminuirCantidad(index: number) {
    if (index >= 0 && index < this.carrito.length && this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
    }
  }
}