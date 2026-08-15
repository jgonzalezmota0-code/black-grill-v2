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

  extras?: Extra[];

  salsas?: string[];

  sabores?: string[];

  especialidades?: string[];
  rellenos?: string[];
  frutas?: string[];
  coberturas?: string[];

  toppings?: string[];
  maxToppings?: number;
  maxCoberturas?: number;

  marcas?: string[];
  presentaciones?: string[];
}

export interface ProductoCarrito extends Producto {
  cantidad: number;

  extrasSeleccionados?: Extra[];

  salsasSeleccionadas?: string[];

  saborSeleccionado?: string;

  especialidadSeleccionada?: string;

  rellenosSeleccionados?: string[];

  frutaSeleccionada?: string;

  coberturaSeleccionada?: string;

  toppingsSeleccionados?: string[];

  marcaSeleccionada?: string;

  presentacionSeleccionada?: string;

  instrucciones?: string;

  precioFinal?: number;
}