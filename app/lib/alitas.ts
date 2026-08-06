import { Producto } from "@/types/producto";

export const alitas: Producto[] = [
  {
    id: 101,
    categoria: "Alitas",
    nombre: "Alitas (7 piezas + papas)",
    precio: 80,
    descripcion:
      "7 alitas con papas. Elige tu salsa al agregar el producto.",
    imagen: "/images/alitas-7.jpg",

    salsas: [
      "BBQ",
      "Mango Habanero",
      "Frambuesa Chipotle",
      "Buffalo",
      "Piña Habanero",
      "Tamarindo Habanero",
      "Lemon Pepper",
    ],

    extras: [
      {
        nombre: "Aderezo Ranch extra",
        precio: 5,
      },
      {
        nombre: "Porción extra de papas",
        precio: 5,
      },
    ],
  },

  {
    id: 102,
    categoria: "Alitas",
    nombre: "Promoción 2 Órdenes",
    precio: 150,
    descripcion:
      "2 órdenes de alitas (7 piezas c/u) con papas. Elige tu salsa.",
    imagen: "/images/alitas-14.jpg",

    salsas: [
      "BBQ",
      "Mango Habanero",
      "Frambuesa Chipotle",
      "Buffalo",
      "Piña Habanero",
      "Tamarindo Habanero",
      "Lemon Pepper",
    ],

    extras: [
      {
        nombre: "Aderezo Ranch extra",
        precio: 5,
      },
      {
        nombre: "Porción extra de papas",
        precio: 5,
      },
    ],
  },

  {
    id: 103,
    categoria: "Alitas",
    nombre: "Alitas por Kilo",
    precio: 245,
    descripcion:
      "1 kilo de alitas con papas. Elige tu salsa.",
    imagen: "/images/alitas-kilo.jpg",

    salsas: [
      "BBQ",
      "Mango Habanero",
      "Frambuesa Chipotle",
      "Buffalo",
      "Piña Habanero",
      "Tamarindo Habanero",
      "Lemon Pepper",
    ],

    extras: [
      {
        nombre: "Aderezo Ranch extra",
        precio: 5,
      },
      {
        nombre: "Porción extra de papas",
        precio: 5,
      },
    ],
  },
];