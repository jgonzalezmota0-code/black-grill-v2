"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Pedido() {
  const [nombre, setNombre] = useState("");
  const [tipoPedido, setTipoPedido] = useState("Comer aquí");
  const [direccion, setDireccion] = useState("");
  const [referencias, setReferencias] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [mesa, setMesa] = useState("");
  const [carrito, setCarrito] = useState<any[]>([]);
  const [enviando, setEnviando] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const datos = localStorage.getItem("carrito");

    if (datos) {
      setCarrito(JSON.parse(datos));
    }

    const parametros = new URLSearchParams(
  window.location.search
);

const mesaQR = parametros.get("mesa");

if (mesaQR) {
  setMesa(mesaQR);
}
  }, []);

  function obtenerTotal() {
    return carrito.reduce(
      (sum: number, item: any) =>
        sum +
        (item.precioFinal ?? item.precio) * item.cantidad,
      0
    );
  }

  function obtenerProductos() {
    return carrito.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precioFinal ?? item.precio,

      extras: item.extrasSeleccionados ?? [],
      salsas: item.salsasSeleccionadas ?? [],
      sabor: item.saborSeleccionado ?? null,
      rellenos: item.rellenosSeleccionados ?? [],
      fruta: item.frutaSeleccionada ?? null,
      cobertura: item.coberturaSeleccionada ?? null,
      toppings: item.toppingsSeleccionados ?? [],
      marca: item.marcaSeleccionada ?? null,
      presentacion: item.presentacionSeleccionada ?? null,
      instrucciones: item.instrucciones ?? null,
    }));
  }

  function construirPedidoWhatsApp() {
    return carrito
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
            ? "\n   Salsas: " +
              item.salsasSeleccionadas.join(" + ")
            : "";

        const marca = item.marcaSeleccionada
          ? "\n   🍺 Marca: " + item.marcaSeleccionada
          : "";

        const presentacion = item.presentacionSeleccionada
          ? "\n   🥤 Presentación: " +
            item.presentacionSeleccionada
          : "";

        const sabor = item.saborSeleccionado
          ? "\n   🥤 Refresco: " +
            item.saborSeleccionado
          : "";

        const rellenos =
          item.rellenosSeleccionados?.length > 0
            ? "\n   🥞 Rellenos: " +
              item.rellenosSeleccionados.join(" + ")
            : "";

        const fruta = item.frutaSeleccionada
          ? "\n   🍓 Fruta: " +
            item.frutaSeleccionada
          : "";

        const cobertura = item.coberturaSeleccionada
          ? "\n   🍫 Cobertura: " +
            item.coberturaSeleccionada
          : "";

        const toppings =
          item.toppingsSeleccionados?.length > 0
            ? "\n   🍬 Toppings: " +
              item.toppingsSeleccionados.join(", ")
            : "";

        const instrucciones = item.instrucciones
          ? "\n   📝 Nota: " +
            item.instrucciones
          : "";

        return (
          "• " +
          item.cantidad +
          " x " +
          item.nombre +
          " - $" +
          ((item.precioFinal ?? item.precio) *
            item.cantidad) +
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
  }

 async function enviarPedido() {
  if (enviando) return;

  if (!nombre.trim()) {
    alert("Escribe tu nombre");
    return;
  }

  if (carrito.length === 0) {
    alert("No hay productos en el carrito");
    return;
  }

  if (tipoPedido === "Comer aquí" && !mesa) {
    alert("Selecciona tu mesa");
    return;
  }

  if (tipoPedido === "A domicilio" && !direccion.trim()) {
    alert("Escribe tu dirección");
    return;
  }

  try {
    setEnviando(true);

    const total = obtenerTotal();
    const productos = obtenerProductos();

    // Número numérico para Supabase
    const numeroPedido = Number(
      Date.now().toString().slice(-8)
    );

    // Número con formato para mostrar al cliente
    const numeroPedidoTexto = "BG-" + numeroPedido;

    // Guardar pedido mediante nuestra API
    const respuesta = await fetch("/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numero_pedido: numeroPedido,
        cliente: nombre.trim(),
        tipo_pedido: tipoPedido,

        mesa:
          tipoPedido === "Comer aquí"
            ? mesa
            : null,

        direccion:
          tipoPedido === "A domicilio"
            ? direccion.trim()
            : null,

        referencias:
          tipoPedido === "A domicilio"
            ? referencias.trim()
            : null,

        metodo_pago: metodoPago,
        productos: productos,
        total: total,
        estado: "nuevo",
        origen: "web",
      }),
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error API:", resultado);

      alert(
        "No se pudo guardar el pedido: " +
          (resultado.error || "Error desconocido")
      );

      setEnviando(false);
      return;
    }
    // Crear mensaje para WhatsApp
    const pedido = construirPedidoWhatsApp();

    const mensaje =
      "Hola Black Grill 🔥\n\n" +
      "🧾 Pedido: " +
      numeroPedidoTexto +
      "\n" +
      "👤 Nombre: " +
      nombre +
      "\n" +
      "🍽️ Tipo: " +
      tipoPedido +
      "\n";

    let datosExtra = "";

    if (tipoPedido === "Comer aquí") {
      datosExtra +=
        "🪑 Mesa: " +
        mesa +
        "\n";
    }

    if (tipoPedido === "A domicilio") {
      datosExtra +=
        "📍 Dirección: " +
        direccion +
        "\n" +
        "🏠 Referencias: " +
        referencias +
        "\n";
    }

    const textoFinal =
      mensaje +
      datosExtra +
      "\n💳 Pago: " +
      metodoPago +
      "\n\n🍔 Pedido:\n\n" +
      pedido +
      "\n\n💰 Total: $" +
      total;

    // Abrir WhatsApp
   window.location.href =
  "https://wa.me/527291013458?text=" +
  encodeURIComponent(textoFinal);

    // Limpiar carrito
    localStorage.removeItem("carrito");

    router.push("/gracias");
  } catch (error) {
    console.error("Error:", error);

    alert(
      "Ocurrió un error al enviar el pedido."
    );

    setEnviando(false);
  }
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
          background:
            "linear-gradient(135deg, #1F2937, #111827)",
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
            Soy <strong>Brasas</strong> y
            revisaré que tu pedido esté listo
            antes de enviarlo por WhatsApp.
          </p>
        </div>
      </div>

      <label>👤 Nombre</label>

      <input
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
        style={input}
      />

      <label>🍽️ Tipo de pedido</label>

      <select
        value={tipoPedido}
        onChange={(e) =>
          setTipoPedido(e.target.value)
        }
        style={input}
      >
        <option>Comer aquí</option>
        <option>Para llevar</option>
        <option>A domicilio</option>
      </select>

      {tipoPedido === "Comer aquí" && (
        <>
          {mesa ? (
            <p
              style={{
                color: "#F59E0B",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              🪑 Mesa asignada
              automáticamente: {mesa}
            </p>
          ) : (
            <>
              <label>
                🪑 Selecciona tu mesa
              </label>

              <select
                value={mesa}
                onChange={(e) =>
                  setMesa(e.target.value)
                }
                style={input}
              >
                <option value="">
                  Selecciona una mesa
                </option>
                <option value="1">
                  Mesa 1
                </option>
                <option value="2">
                  Mesa 2
                </option>
                <option value="3">
                  Mesa 3
                </option>
                <option value="4">
                  Mesa 4
                </option>
                <option value="5">
                  Mesa 5
                </option>
                <option value="6">
                  Mesa 6
                </option>
              </select>
            </>
          )}
        </>
      )}

      {tipoPedido === "A domicilio" && (
        <>
          <label>📍 Dirección</label>

          <input
            value={direccion}
            onChange={(e) =>
              setDireccion(e.target.value)
            }
            style={input}
          />

          <label>🏠 Referencias</label>

          <input
            value={referencias}
            onChange={(e) =>
              setReferencias(e.target.value)
            }
            style={input}
          />
        </>
      )}

      <label>💳 Método de pago</label>

      <select
        value={metodoPago}
        onChange={(e) =>
          setMetodoPago(e.target.value)
        }
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
        <h3 style={{ color: "#F59E0B" }}>
          🛒 Tu pedido
        </h3>

        {carrito.length === 0 ? (
          <p>No hay productos.</p>
        ) : (
          <>
            {carrito.map(
              (item: any, indice) => (
                <div
                  key={item.id + "-" + indice}
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {item.cantidad} ×{" "}
                      {item.nombre} — $
                      {(item.precioFinal ??
                        item.precio) *
                        item.cantidad}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => {
                          const nuevoCarrito =
                            [...carrito];

                          const indice =
                            nuevoCarrito.findIndex(
                              (p) => p === item
                            );

                          if (
                            nuevoCarrito[indice]
                              .cantidad > 1
                          ) {
                            nuevoCarrito[
                              indice
                            ].cantidad--;
                          } else {
                            nuevoCarrito.splice(
                              indice,
                              1
                            );
                          }

                          setCarrito(
                            nuevoCarrito
                          );

                          localStorage.setItem(
                            "carrito",
                            JSON.stringify(
                              nuevoCarrito
                            )
                          );
                        }}
                        style={botonRojo}
                      >
                        -
                      </button>

                      <button
                        onClick={() => {
                          const nuevoCarrito =
                            [...carrito];

                          const indice =
                            nuevoCarrito.findIndex(
                              (p) => p === item
                            );

                          nuevoCarrito[
                            indice
                          ].cantidad++;

                          setCarrito(
                            nuevoCarrito
                          );

                          localStorage.setItem(
                            "carrito",
                            JSON.stringify(
                              nuevoCarrito
                            )
                          );
                        }}
                        style={botonVerde}
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          const nuevoCarrito =
                            carrito.filter(
                              (p) => p !== item
                            );

                          setCarrito(
                            nuevoCarrito
                          );

                          localStorage.setItem(
                            "carrito",
                            JSON.stringify(
                              nuevoCarrito
                            )
                          );
                        }}
                        style={botonGris}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {item.saborSeleccionado && (
                    <Detalle>
                      🥤 Refresco:{" "}
                      {item.saborSeleccionado}
                    </Detalle>
                  )}

                  {item.rellenosSeleccionados
                    ?.length > 0 && (
                    <Detalle>
                      🥞 Rellenos:{" "}
                      {item.rellenosSeleccionados.join(
                        " + "
                      )}
                    </Detalle>
                  )}

                  {item.frutaSeleccionada && (
                    <Detalle>
                      🍓 Fruta:{" "}
                      {item.frutaSeleccionada}
                    </Detalle>
                  )}

                  {item.coberturaSeleccionada && (
                    <Detalle>
                      🍫 Cobertura:{" "}
                      {item.coberturaSeleccionada}
                    </Detalle>
                  )}

                  {item.toppingsSeleccionados
                    ?.length > 0 && (
                    <Detalle>
                      🍬 Toppings:{" "}
                      {item.toppingsSeleccionados.join(
                        ", "
                      )}
                    </Detalle>
                  )}

                  {item.marcaSeleccionada && (
                    <Detalle>
                      🍺 Marca:{" "}
                      {item.marcaSeleccionada}
                    </Detalle>
                  )}

                  {item.presentacionSeleccionada && (
                    <Detalle>
                      🥤 Presentación:{" "}
                      {
                        item.presentacionSeleccionada
                      }
                    </Detalle>
                  )}

                  {item.salsasSeleccionadas
                    ?.length > 0 && (
                    <Detalle>
                      🌶️ Salsas:{" "}
                      {item.salsasSeleccionadas.join(
                        " + "
                      )}
                    </Detalle>
                  )}

                  {item.extrasSeleccionados
                    ?.length > 0 && (
                    <div
                      style={{
                        marginLeft: "15px",
                        fontSize: "14px",
                        color: "#D1D5DB",
                      }}
                    >
                      {item.extrasSeleccionados.map(
                        (extra: any) => (
                          <div
                            key={extra.nombre}
                          >
                            • {extra.nombre}
                          </div>
                        )
                      )}
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
                      📝{" "}
                      {item.instrucciones}
                    </div>
                  )}
                </div>
              )
            )}

            <hr
              style={{
                margin: "15px 0",
              }}
            />

            <h2>
              Total: $
              {obtenerTotal()}
            </h2>
          </>
        )}
      </div>

      <button
        onClick={enviarPedido}
        disabled={enviando}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          background: enviando
            ? "#9CA3AF"
            : "#F59E0B",
          color: "black",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: enviando
            ? "not-allowed"
            : "pointer",
        }}
      >
        {enviando
          ? "⏳ Enviando pedido..."
          : "📲 Enviar pedido"}
      </button>
    </main>
  );
}

function Detalle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginLeft: "15px",
        color: "#60A5FA",
        fontSize: "14px",
      }}
    >
      {children}
    </div>
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

const botonRojo = {
  background: "#EF4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "5px 10px",
  cursor: "pointer",
};

const botonVerde = {
  background: "#22C55E",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "5px 10px",
  cursor: "pointer",
};

const botonGris = {
  background: "#6B7280",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "5px 10px",
  cursor: "pointer",
};