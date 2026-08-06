import { Producto } from "@/types/producto";

import { hamburguesas } from "./hamburguesas";
import { alitas } from "./alitas";
import { boneless } from "./boneless";
import { complementos } from "./complementos";
import { costillas } from "./costillas";
import { crepas } from "./crepas";
import { frappes } from "./frappes";
import { malteadas } from "./malteadas";
import { bebidas } from "./bebidas";
import { combos } from "./combos";
import { helados } from "./helados";

export const productos: Producto[] = [
  ...hamburguesas,
  ...alitas,
  ...boneless,
  ...complementos,
  ...costillas,
  ...crepas,
  ...frappes,
  ...malteadas,
  ...bebidas,
  ...combos,
  ...helados
];