"use client";

import { ProductoCarrito } from "@/types/producto";

type Props = {
  carrito: ProductoCarrito[];
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
  eliminarProducto: (id: number) => void;
  vaciarCarrito: () => void;
  realizarPedido: () => void;
};

export default function Carrito({
  carrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito,
  realizarPedido,
}: Props) {
  const total = carrito.reduce(
  (suma, producto) =>
    suma + (producto.precioFinal ?? producto.precio) * producto.cantidad,
  0
);

  return (
    <div
      style={{
  position: "fixed",
  top: "100px",
  right: "20px",
  width: "350px",
  maxHeight: "75vh",
  overflowY: "auto",
  backgroundColor: "#1F2937",
  color: "white",
  borderRadius: "15px",
  padding: "20px",
  paddingRight: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
}}
    >
     <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
    borderBottom: "1px solid #374151",
    paddingBottom: "15px",
  }}
>
   <img
  src="/images/brasas/brasas-oficial.webp"
  alt="Brasas"
    style={{
      width: "80px",
      height: "80px",
      objectFit: "contain",
    }}
  />

  <div>
    <h2
      style={{
        margin: 0,
        color: "#F59E0B",
      }}
    >
      🛒 Mi carrito
    </h2>

    <p
      style={{
        marginTop: "8px",
        color: "#D1D5DB",
        fontSize: "14px",
      }}
    >
      ¡Hola! Soy <strong>Brasas</strong>. 🔥
      <br />
      Revisemos que tu pedido esté perfecto.
    </p>
  </div>
</div>

      {carrito.length === 0 ? (
        <div
  style={{
    textAlign: "center",
    padding: "20px 0",
  }}
>
<img
  src="/images/brasas/brasas-carrito.webp"
  alt="Brasas con carrito"
    style={{
      width: "140px",
      marginBottom: "15px",
    }}
  />

  <h3
    style={{
      color: "#F59E0B",
      marginBottom: "10px",
    }}
  >
    ¡Tu carrito está vacío!
  </h3>

  <p
    style={{
      color: "#D1D5DB",
      lineHeight: 1.6,
    }}
  >
    Agrega tus productos favoritos para comenzar tu pedido.
    <br />
    ¡Yo me encargo del resto! 🔥
  </p>
</div>
      ) : (
        carrito.map((producto) => (
          <div
            key={producto.id}
            style={{
              borderBottom: "1px solid #374151",
              padding: "15px 0",
            }}
          >
            <strong>{producto.nombre}</strong>
            {producto.extrasSeleccionados &&
  producto.extrasSeleccionados.length > 0 && (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "8px",
        fontSize: "14px",
        color: "#D1D5DB",
      }}
    >
      <strong>Extras:</strong>

      {producto.extrasSeleccionados.map((extra) => (
        <div key={extra.nombre}>
          • {extra.nombre} (+${extra.precio})
        </div>
      ))}
    </div>
  )}
{producto.saborSeleccionado && (
  <p
    style={{
      marginTop: "8px",
      color: "#D1D5DB",
      fontSize: "14px",
    }}
  >
    <strong>Sabor:</strong> {producto.saborSeleccionado}
  </p>
)}

{producto.coberturaSeleccionada && (
  <p
    style={{
      marginTop: "8px",
      color: "#D1D5DB",
      fontSize: "14px",
    }}
  >
    <strong>Cobertura:</strong> {producto.coberturaSeleccionada}
  </p>
)}

{producto.toppingsSeleccionados &&
  producto.toppingsSeleccionados.length > 0 && (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "8px",
        fontSize: "14px",
        color: "#D1D5DB",
      }}
    >
      <strong>Toppings:</strong>

      {producto.toppingsSeleccionados.map((topping) => (
        <div key={topping}>
          • {topping}
        </div>
      ))}
    </div>
)}
{producto.instrucciones && (
  <p
    style={{
      marginTop: "8px",
      color: "#FBBF24",
      fontStyle: "italic",
      fontSize: "14px",
    }}
  >
    📝 {producto.instrucciones}
  </p>
)}
            <p style={{ margin: "6px 0", color: "#D1D5DB" }}>
              ${producto.precioFinal ?? producto.precio} c/u
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <button
                onClick={() => disminuirCantidad(producto.id)}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#EF4444",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                −
              </button>

              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {producto.cantidad}
              </span>

              <button
                onClick={() => aumentarCantidad(producto.id)}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#22C55E",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                +
              </button>

              <button
                onClick={() => eliminarProducto(producto.id)}
                style={{
                  marginLeft: "auto",
                  backgroundColor: "#DC2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                🗑️
              </button>
            </div>

            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "#F59E0B",
              }}
            >
              Subtotal: ${(producto.precioFinal ?? producto.precio) * producto.cantidad}
            </p>
          </div>
        ))
      )}

      <hr style={{ margin: "20px 0", borderColor: "#374151" }} />

      <h2 style={{ color: "#F59E0B" }}>Total: ${total}</h2>
  
      <button
  onClick={vaciarCarrito}
  disabled={carrito.length === 0}
  style={{
    width: "100%",
    marginTop: "20px",
    marginBottom: "10px",
    padding: "15px",
    backgroundColor: carrito.length === 0 ? "#6B7280" : "#DC2626",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: carrito.length === 0 ? "not-allowed" : "pointer",
  }}
>
  🗑️ Vaciar carrito
</button>
      <button
        onClick={realizarPedido}
        disabled={carrito.length === 0}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          backgroundColor:
            carrito.length === 0 ? "#6B7280" : "#F59E0B",
          color: "black",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: carrito.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        📲 Realizar pedido
      </button>
    </div>
  );
}