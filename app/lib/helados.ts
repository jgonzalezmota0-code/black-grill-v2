import { Producto } from "@/types/producto";

const coberturas = [
  "Chocolate",
  "Cajeta",
  "Fresa",
  "Lechera",
];

const toppings = [
  "Oreo",
  "M&M's",
  "Krankis",
  "Nuez",
  "Fresa",
  "Mango",
  "Durazno",
  "Cajeta",
  "Chocolate",
  "Lechera",
  "Mermelada de Fresa",
  "Lunetas de Yogurt",
  "Cacahuate",
  "Mazapán",
  "Coco",
  "Granola",
  "Cereal",
];

export const helados: Producto[] = [
  {
  id: 1001,
  categoria: "Helados",
  nombre: "Cono Sencillo",
  precio: 35,
  descripcion: "Helado suave de vainilla.",
  imagen: "/images/cono-sencillo.jpg",
},

  {
  id: 1002,
  categoria: "Helados",
  nombre: "Cono Doble",
  precio: 45,
  descripcion: "Dos bolas de helado de vainilla.",
  imagen: "/images/cono-doble.jpg",
},

  {
  id: 1003,
  categoria: "Helados",
  nombre: "Cono con 1 Topping",
  precio: 50,
  descripcion: "Helado de vainilla con 1 cobertura y 1 topping.",
  imagen: "/images/cono-topping.jpg",
  coberturas,
  toppings,
  maxCoberturas: 1,
  maxToppings: 1,
},

  {
  id: 1004,
  categoria: "Helados",
  nombre: "Cono Especial",
  precio: 60,
  descripcion: "Helado de vainilla con 1 cobertura y 2 toppings.",
  imagen: "/images/cono-especial.jpg",
  coberturas,
  toppings,
  maxCoberturas: 1,
  maxToppings: 2,
},

  {
    id: 1005,
    categoria: "Helados",
    nombre: "Vaso 4 oz",
    precio: 40,
    descripcion: "1 cobertura y 1 topping.",
    imagen: "/images/vaso-4oz.jpg",
    sabores: ["Vainilla", "Mezcla"],
    coberturas,
    toppings,
    maxCoberturas: 1,
    maxToppings: 1,
  },

  {
    id: 1006,
    categoria: "Helados",
    nombre: "Vaso 6 oz",
    precio: 55,
    descripcion: "1 cobertura y 2 toppings.",
    imagen: "/images/vaso-6oz.jpg",
    sabores: ["Vainilla", "Mezcla"],
    coberturas,
    toppings,
    maxCoberturas: 1,
    maxToppings: 2,
  },

  {
    id: 1007,
    categoria: "Helados",
    nombre: "Vaso 8 oz",
    precio: 70,
    descripcion: "1 cobertura y 3 toppings.",
    imagen: "/images/vaso-8oz.jpg",
    sabores: ["Vainilla", "Mezcla"],
    coberturas,
    toppings,
    maxCoberturas: 1,
    maxToppings: 3,
  },

  {
    id: 1008,
    categoria: "Helados",
    nombre: "Sundae de Fresa",
    precio: 65,
    descripcion: "Sundae clásico.",
    imagen: "/images/sundae-fresa.jpg",
  },

  {
    id: 1009,
    categoria: "Helados",
    nombre: "Sundae de Chocolate",
    precio: 65,
    descripcion: "Sundae clásico.",
    imagen: "/images/sundae-chocolate.jpg",
  },

  {
    id: 1010,
    categoria: "Helados",
    nombre: "Sundae de Cajeta",
    precio: 65,
    descripcion: "Sundae clásico.",
    imagen: "/images/sundae-cajeta.jpg",
  },
];