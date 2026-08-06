import { Producto } from "@/types/producto";

export const boneless: Producto[] = [
  {
    id: 201,
    categoria: "Boneless",
    nombre: "Boneless (250 g + papas)",
    precio: 90,
    descripcion:
      "250 g de boneless con papas. Elige hasta 2 salsas al agregar el producto.",
    imagen: "/images/boneless.jpg",

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
    id: 202,
    categoria: "Boneless",
    nombre: "Boneless (500 g + papas)",
    precio: 180,
    descripcion:
      "500 g de boneless con papas. Elige hasta 2 salsas al agregar el producto.",
    imagen: "/images/boneless.jpg",

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