import Link from "next/link";
import { Producto } from "@/types/producto";

type Props = {
  producto: Producto;
  agregarAlCarrito: (producto: Producto) => void;
};

export default function ProductoCard({
  producto,
  agregarAlCarrito,
}: Props) {
  return (
    <div
      style={{
  backgroundColor: "#1E1E1E",
  color: "white",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "25px",
  maxWidth: "360px",
  boxShadow: "0 10px 25px rgba(80, 48, 48, 0.35)",
  border: "1px solid #333",
  transition: "transform .25s ease, box-shadow .25s ease",
}}
/*
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.03)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
*/
    >
      <div style={{ position: "relative" }}>
  <img
    src={producto.imagen}
    alt={producto.nombre}
    width={300}
    height={200}
    style={{
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "14px",
      marginBottom: "15px",
    }}
  />

  <div
    style={{
      position: "absolute",
      top: "12px",
      left: "12px",
      backgroundColor: "#DC2626",
      color: "white",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "bold",
      boxShadow: "0 4px 10px rgba(0,0,0,.3)",
    }}
  >
    🔥 Recomendado
  </div>
</div>

      <h2
        style={{
          color: "#F59E0B",
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        {producto.nombre}
      </h2>
<div
  style={{
    display: "inline-block",
    background: "#374151",
    color: "#FCD34D",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "12px",
  }}
>
  {producto.categoria}
</div>
      <p
        style={{
          color: "#D1D5DB",
          lineHeight: "1.6",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        {producto.descripcion}
      </p>

      <div
  style={{
    display: "inline-block",
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#F59E0B",
    color: "#111",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "24px",
    boxShadow: "0 4px 10px rgba(245,158,11,0.35)",
  }}
>
  ${producto.precio}
</div>

      <button
  onClick={() => agregarAlCarrito(producto)}
  style={{
    background: "linear-gradient(135deg, #22C55E, #16A34A)",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    width: "100%",
    marginTop: "18px",
    boxShadow: "0 6px 15px rgba(34,197,94,.35)",
    transition: "all .2s ease",
  }}
  /*
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.03)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
*/
>
  🛒 Agregar al carrito
</button>

      <Link href={"/producto/" + producto.id}>
        <button
          style={{
            backgroundColor: "#F59E0B",
            color: "black",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Ver detalles
        </button>
      </Link>
    </div>
  );
}