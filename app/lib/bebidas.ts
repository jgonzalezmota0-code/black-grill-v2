import { Producto } from "@/types/producto";

export const bebidas: Producto[] = [
  {
  id: 701,
  categoria: "Bebidas",
  nombre: "Refresco",
  precio: 28,
  descripcion: "Elige tu refresco favorito.",
  imagen: "/images/refresco.jpg",

  sabores: [
    "Coca-Cola",
    "Pepsi",
    "Sprite",
    "Mirinda",
    "Manzanita",
    "Boing Mango",
    "Boing Manzana",
    "Boing Fresa",
    "Boing Guayaba",
  ],
},
  {
    id: 702,
    categoria: "Bebidas",
    nombre: "Cerveza",
    precio: 30,
    descripcion: "Elige tu cerveza favorita.",
    imagen: "/images/cerveza.jpg",

    marcas: [
      "Corona",
      "Victoria",
    ],

    presentaciones: [
      "Sin tarro",
      "Tarro con limón y sal",
      "Tarro con chamoy y Tajín",
    ],
  },
];

