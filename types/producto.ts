export interface Extra {
  nombre: string;
  precio: number;
}

export interface Producto {
  id: number;
  categoria: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;

  // Hamburguesas y otros extras
  extras?: Extra[];

  // Alitas y Boneless
  salsas?: string[];

  // Refrescos, Frappés y Malteadas
  sabores?: string[];
  // Crepas
rellenos?: string[];
frutas?: string[];
coberturas?: string[];

toppings?: string[];
maxToppings?: number;
maxCoberturas?: number;

  // Cervezas
  marcas?: string[];
  presentaciones?: string[];
}

export interface ProductoCarrito extends Producto {
  cantidad: number;

  extrasSeleccionados?: Extra[];

  salsasSeleccionadas?: string[];

  saborSeleccionado?: string;
  rellenosSeleccionados?: string[];
frutaSeleccionada?: string;
coberturaSeleccionada?: string;

toppingsSeleccionados?: string[];

  marcaSeleccionada?: string;

  presentacionSeleccionada?: string;

  instrucciones?: string;

  precioFinal?: number;
}