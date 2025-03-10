import { Injectable } from '@angular/core';
import { Producto } from '../models/producto'; // Adjust the path

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  agregarProducto(producto: Producto) {
    this.carrito.push(producto);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
    }
  }

  generarXML(): string {
    let subtotal = 0;
    this.carrito.forEach((producto) => {
      subtotal += producto.precio || 0;
    });
    let iva = subtotal * 0.16;
    let total = subtotal + iva;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<cfdi:Comprobante Version="4.0" xmlns:cfdi="http://www.sat.gob.mx/cfd/4" `;
    xml += `xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" `;
    xml += `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" `;
    xml += `xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/cfd/4/cfdv40.xsd" `;
    xml += `Serie="A" Folio="12345" Fecha="${new Date().toISOString()}" FormaPago="01" Moneda="MXN" `;
    xml += `SubTotal="${subtotal.toFixed(2)}" Descuento="0.00" Total="${total.toFixed(2)}" `;
    xml += `TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="99999">\n`;

    xml += `  <cfdi:Emisor Rfc="EMIS123456789" Nombre="Emisor SA de CV" RegimenFiscal="601"/>\n`;
    xml += `  <cfdi:Receptor Rfc="RECEP987654321" Nombre="Receptor SA de CV" UsoCFDI="G03"/>\n`;
    xml += `  <cfdi:Conceptos>\n`;
    this.carrito.forEach((producto) => {
      xml += `    <cfdi:Concepto ClaveProdServ="10101504" Cantidad="1" ClaveUnidad="H87" Descripcion="${producto.nombre || 'Producto sin nombre'}" `;
      xml += `ValorUnitario="${(producto.precio || 0).toFixed(2)}" Importe="${(producto.precio || 0).toFixed(2)}"/>\n`;
    });
    xml += `  </cfdi:Conceptos>\n`;
    xml += `  <cfdi:Impuestos TotalImpuestosRetenidos="0.00" TotalImpuestosTrasladados="${iva.toFixed(2)}">\n`;
    xml += `    <cfdi:Traslados>\n`;
    xml += `      <cfdi:Traslado Importe="${iva.toFixed(2)}" TipoImpuesto="IVA" TasaImpuesto="16.00">\n`;
    xml += `        <cfdi:BaseImpuesto>${subtotal.toFixed(2)}</cfdi:BaseImpuesto>\n`;
    xml += `      </cfdi:Traslado>\n`;
    xml += `    </cfdi:Traslados>\n`;
    xml += `  </cfdi:Impuestos>\n`;
    xml += `  <cfdi:TimbreFiscalDigital Version="1.1" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital">\n`;
    xml += `    <tfd:UUID>7E6492B9-43B7-418B-90C1-B174F2743242</tfd:UUID>\n`;
    xml += `    <tfd:FechaTimbrado>${new Date().toISOString()}</tfd:FechaTimbrado>\n`;
    xml += `  </cfdi:TimbreFiscalDigital>\n`;
    xml += `<tfd:SelloCFD>v851/y2684/y74h75rD8757634343234324324324324324324324324324324324324324324324324</tfd:SelloCFD>\n`;
    xml += `</cfdi:Comprobante>`;
    return xml;
  }

  descargaXML(): void {
    const xmlContent = this.generarXML();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CFDI_4.0.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
}