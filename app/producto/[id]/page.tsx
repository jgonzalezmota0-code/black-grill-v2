import { productos } from "../../lib/productos";
import ProductoCliente from "./ProductoCliente";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductoDetalle({ params }: Props) {
  const { id } = await params;

  const producto = productos.find(
    (p) => p.id === Number(id)
  );

  if (!producto) {
    return <h1>Producto no encontrado</h1>;
  }

  return <ProductoCliente producto={producto} />;
}