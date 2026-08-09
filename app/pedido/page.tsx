"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Pedido() {
  const [nombre, setNombre] = useState("");
  const [tipoPedido, setTipoPedido] = useState("Comer aquí");
  const [direccion, setDireccion] = useState("");
  const [referencias, setReferencias] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [mesa, setMesa] = useState("");
const [carrito, setCarrito] = useState<any[]>([]);
const router = useRouter();

useEffect(() => {
  const datos = localStorage.getItem("carrito");

  if (datos) {
    setCarrito(JSON.parse(datos));
  }
}, []);
function enviarPedido() {
  if (!nombre.trim()) {
    alert("Escribe tu nombre");
    return;
  }

 const pedido = carrito
  .map((item: any) => {
    const extras =
      item.extrasSeleccionados?.length > 0
        ? "\n   Extras: " +
          item.extrasSeleccionados
            .map((extra: any) => extra.nombre)
            .join(", ")
        : "";
        const salsas =
  item.salsasSeleccionadas?.length > 0
    ? "\n   Salsas: " + item.salsasSeleccionadas.join(" + ")
    : "";
const marca =
  item.marcaSeleccionada
    ? "\n   🍺 Marca: " + item.marcaSeleccionada
    : "";

const presentacion =
  item.presentacionSeleccionada
    ? "\n   🥤 Presentación: " + item.presentacionSeleccionada
    : "";
    const sabor =
  item.saborSeleccionado
    ? "\n   🥤 Refresco: " + item.saborSeleccionado
    : "";
    const rellenos =
  item.rellenosSeleccionados?.length > 0
    ? "\n   🥞 Rellenos: " + item.rellenosSeleccionados.join(" + ")
    : "";

const fruta =
  item.frutaSeleccionada
    ? "\n   🍓 Fruta: " + item.frutaSeleccionada
    : "";

const cobertura =
  item.coberturaSeleccionada
    ? "\n   🍫 Cobertura: " + item.coberturaSeleccionada
    : "";
    const toppings =
  item.toppingsSeleccionados?.length > 0
    ? "\n   🍬 Toppings: " + item.toppingsSeleccionados.join(", ")
    : "";
    const instrucciones = item.instrucciones
      ? "\n   Nota: " + item.instrucciones
      : "";

  return (
  "• " +
  item.cantidad +
  " x " +
  item.nombre +
  " - $" +
  ((item.precioFinal ?? item.precio) * item.cantidad) +
  sabor +
  rellenos +
  fruta +
  cobertura +
  toppings +
  marca +
  presentacion +
  salsas +
  extras +
  instrucciones
);
  })
  .join("\n\n");

  const total = carrito.reduce(
    (sum: number, item: any) => sum + (item.precioFinal ?? item.precio) * item.cantidad,
    0
  );

  const mensaje =
  "Hola Black Grill 🔥\n\n" +
  "👤 Nombre: " + nombre + "\n" +
  "🍽️ Tipo: " + tipoPedido + "\n";

let datosExtra = "";

if (tipoPedido === "Comer aquí") {
  datosExtra += "🪑 Mesa: " + mesa + "\n";
}

if (tipoPedido === "A domicilio") {
  datosExtra +=
    "📍 Dirección: " + direccion + "\n" +
    "🏠 Referencias: " + referencias + "\n";
}

const textoFinal =
  mensaje +
  datosExtra +
  "\n💳 Pago: " + metodoPago +
  "\n\n🍔 Pedido:\n\n" +
  pedido +
  "\n\n💰 Total: $" + total;
  window.open(
    "https://wa.me/5217291013458?text=" +
      encodeURIComponent(textoFinal),
    "_blank"
  );

  localStorage.removeItem("carrito");
  router.push("/gracias");
}
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <div
  style={{
    background: "linear-gradient(135deg, #1F2937, #111827)",
    border: "2px solid #F59E0B",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  }}
>
  <img
    src="/images/brasas.png"
    alt="Brasas"
    style={{
      width: "110px",
      height: "110px",
      objectFit: "contain",
    }}
  />

  <div>
    <h1
      style={{
        margin: 0,
        color: "#F59E0B",
      }}
    >
      📋 Datos del pedido
    </h1>

    <p
      style={{
        marginTop: "10px",
        color: "#E5E7EB",
        lineHeight: 1.6,
      }}
    >
      ¡Excelente elección! 🔥
      <br />
      Soy <strong>Brasas</strong> y revisaré que tu pedido esté listo antes de enviarlo por WhatsApp.
    </p>
  </div>
</div>

      <label>👤 Nombre</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={input}
      />

      <label>🍽️ Tipo de pedido</label>
      <select
        value={tipoPedido}
        onChange={(e) => setTipoPedido(e.target.value)}
        style={input}
      >
        <option>Comer aquí</option>
        <option>Para llevar</option>
        <option>A domicilio</option>
      </select>
{tipoPedido === "Comer aquí" && (
  <>
    <label>🪑 Número de mesa</label>
    <input
      value={mesa}
      onChange={(e) => setMesa(e.target.value)}
      style={input}
      placeholder="Ejemplo: Mesa 5"
    />
  </>
)}
      {tipoPedido === "A domicilio" && (
        <>
          <label>📍 Dirección</label>
          <input
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            style={input}
          />

          <label>🏠 Referencias</label>
          <input
            value={referencias}
            onChange={(e) => setReferencias(e.target.value)}
            style={input}
          />
        </>
      )}

      <label>💳 Método de pago</label>
      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        style={input}
      >
        <option>Efectivo</option>
        <option>Tarjeta</option>
        <option>Transferencia</option>
      </select>
<div
  style={{
    marginTop: "25px",
    background: "#1F2937",
    padding: "15px",
    borderRadius: "10px",
  }}
>
  <h3 style={{ color: "#F59E0B" }}>🛒 Tu pedido</h3>

  {carrito.length === 0 ? (
    <p>No hay productos.</p>
  ) : (
    <>
    {carrito.map((item: any) => (
  <div key={item.id} style={{ marginBottom: "15px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {item.cantidad} × {item.nombre} — $
        {(item.precioFinal ?? item.precio) * item.cantidad}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => {
            const nuevoCarrito = [...carrito];
            const indice = nuevoCarrito.findIndex((p) => p === item);

            if (nuevoCarrito[indice].cantidad > 1) {
              nuevoCarrito[indice].cantidad--;
            } else {
              nuevoCarrito.splice(indice, 1);
            }

            setCarrito(nuevoCarrito);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
          }}
          style={{
            background: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          -
        </button>

        <button
          onClick={() => {
            const nuevoCarrito = [...carrito];
            const indice = nuevoCarrito.findIndex((p) => p === item);

            nuevoCarrito[indice].cantidad++;

            setCarrito(nuevoCarrito);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
          }}
          style={{
            background: "#22C55E",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            const nuevoCarrito = carrito.filter((p) => p !== item);
            setCarrito(nuevoCarrito);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
          }}
          style={{
            background: "#6B7280",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          🗑️
        </button>
      </div>
    </div>
{item.saborSeleccionado && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🥤 Refresco: {item.saborSeleccionado}
  </div>
)}
{item.rellenosSeleccionados?.length > 0 && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🥞 Rellenos: {item.rellenosSeleccionados.join(" + ")}
  </div>
)}

{item.frutaSeleccionada && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🍓 Fruta: {item.frutaSeleccionada}
  </div>
)}

{item.coberturaSeleccionada && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🍫 Cobertura: {item.coberturaSeleccionada}
  </div>
)}
{item.toppingsSeleccionados?.length > 0 && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🍬 Toppings: {item.toppingsSeleccionados.join(", ")}
  </div>
)}
{item.marcaSeleccionada && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🍺 Marca: {item.marcaSeleccionada}
  </div>
)}

{item.presentacionSeleccionada && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🥤 Presentación: {item.presentacionSeleccionada}
  </div>
)}
{item.salsasSeleccionadas?.length > 0 && (
  <div
    style={{
      marginLeft: "15px",
      color: "#60A5FA",
      fontSize: "14px",
    }}
  >
    🌶️ Salsas: {item.salsasSeleccionadas.join(" + ")}
  </div>
)}
    {item.extrasSeleccionados?.length > 0 && (
      <div style={{ marginLeft: "15px", fontSize: "14px", color: "#D1D5DB" }}>
        {item.extrasSeleccionados.map((extra: any) => (
          <div key={extra.nombre}>• {extra.nombre}</div>
        ))}
      </div>
    )}

    {item.instrucciones && (
      <div
        style={{
          marginLeft: "15px",
          fontSize: "14px",
          color: "#FBBF24",
          fontStyle: "italic",
        }}
      >
        📝 {item.instrucciones}
      </div>
    )}
  </div>
))}

      <hr style={{ margin: "15px 0" }} />

      <h2>
  Total: $
  {carrito.reduce(
    (sum: number, item: any) =>
      sum + (item.precioFinal ?? item.precio) * item.cantidad,
    0
  )}
</h2>
    </>
  )}
</div>
      <button
      onClick={enviarPedido}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          background: "#F59E0B",
          color: "black",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        
        📲 Enviar pedido
      </button>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#1F2937",
  color: "white",
};