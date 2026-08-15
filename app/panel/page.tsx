"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

import { productos } from "@/app/lib/productos";
import { Producto, Extra } from "@/types/producto";
import PersonalizarProducto from "@/components/PersonalizarProducto";

type Estado = "nuevo" | "preparacion" | "listo";

type Pedido = {
  id: number;
  origen: string;
  cliente: string;
  hora: string;
  productos: string[];
  total: number;
  estado: Estado;
};


export default function PanelPage() {
  const [pedidos, setPedidos] =
  useState<Pedido[]>([]);
  useEffect(function () {
  async function cargarPedidos() {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error cargando pedidos:", error);
      return;
    }
console.log("PEDIDOS DESDE SUPABASE:", data);
console.log("ERROR SUPABASE:", error);
    if (!data) {
      return;
    }

    const pedidosFormateados: Pedido[] =
      data
        .filter(function (pedido: any) {
          return (
            pedido.estado === "nuevo" ||
            pedido.estado === "preparacion" ||
            pedido.estado === "listo"
          );
        })
        .map(function (pedido: any) {
          let productosFormateados: string[] = [];

          if (Array.isArray(pedido.productos)) {
            productosFormateados =
              pedido.productos.map(function (producto: any) {
                if (typeof producto === "string") {
                  return producto;
                }

                const cantidad =
                  producto.cantidad || 1;

                const nombre =
                  producto.nombre ||
                  producto.name ||
                  "Producto";

                const precio =
                  producto.precio ||
                  producto.price ||
                  0;

                let linea =
                  cantidad +
                  "x " +
                  nombre +
                  " — $" +
                  precio;

               if (producto.extras) {
  let extrasTexto = "";

  if (Array.isArray(producto.extras)) {
    extrasTexto = producto.extras
      .map(function (extra: any) {
        if (typeof extra === "string") {
          return extra;
        }

        return (
          extra.nombre ||
          extra.name ||
          "Extra"
        );
      })
      .join(", ");
  } else if (typeof producto.extras === "string") {
    extrasTexto = producto.extras;
  } else {
    extrasTexto =
      producto.extras.nombre ||
      producto.extras.name ||
      "Extra";
  }

  if (extrasTexto) {
    linea +=
      " | Extras: " +
      extrasTexto;
  }
}

                return linea;
              });
          }

          const fecha =
            pedido.created_at
              ? new Date(pedido.created_at)
              : new Date();

          return {
            id: Number(pedido.numero_pedido || pedido.id),

            origen:
              pedido.tipo_pedido === "Comer aquí"
                ? "Mesa " +
                  (pedido.mesa || "") +
                  " · QR"
                : pedido.tipo_pedido,

            cliente:
              pedido.cliente || "Cliente",

            hora: fecha.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),

            productos:
              productosFormateados,

            total:
              Number(pedido.total) || 0,

            estado:
              pedido.estado as Estado,
          };
        });

    setPedidos(pedidosFormateados);
  }

  cargarPedidos();

const canal = supabase
  .channel("pedidos-panel")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "pedidos",
    },
    function () {
      cargarPedidos();
    }
  )
  .subscribe();

return function () {
  supabase.removeChannel(canal);
};
}, []);

  const [pedidoSeleccionado, setPedidoSeleccionado] =
    useState<Pedido | null>(null);

  const [
    productoParaPersonalizar,
    setProductoParaPersonalizar,
  ] = useState<Producto | null>(null);

  const [
    mostrarPersonalizador,
    setMostrarPersonalizador,
  ] = useState(false);

const [
  mostrarNuevoPedido,
  setMostrarNuevoPedido,
] = useState(false);

const [tipoNuevoPedido, setTipoNuevoPedido] =
  useState("Mesa");

const [mesaNuevoPedido, setMesaNuevoPedido] =
  useState("");

const [clienteNuevoPedido, setClienteNuevoPedido] =
  useState("");

const [productosNuevoPedido, setProductosNuevoPedido] =
  useState<string[]>([]);

const [totalNuevoPedido, setTotalNuevoPedido] =
  useState(0);

  const [agregandoNuevoPedido, setAgregandoNuevoPedido] =
    useState(false);

  function agregarProductoNuevoPedido(
  producto: Producto,
  extrasSeleccionados: Extra[],
  salsaSeleccionada: string,
  saborSeleccionado: string,
  especialidadSeleccionada: string,
  rellenosSeleccionados: string[],
  frutasSeleccionadas: string[],
  coberturasSeleccionadas: string[],
  toppingsSeleccionados: string[],
  marcaSeleccionada: string,
  presentacionSeleccionada: string,
  instrucciones: string
) {
  const precioExtras =
    extrasSeleccionados.reduce(function (
      suma,
      extra
    ) {
      return suma + extra.precio;
    }, 0);

  const precioFinal =
    producto.precio + precioExtras;

  let linea =
    "1x " +
    producto.nombre +
    " — $" +
    precioFinal;

  if (extrasSeleccionados.length > 0) {
    linea +=
      " | Extras: " +
      extrasSeleccionados
        .map(function (extra) {
          return extra.nombre;
        })
        .join(", ");
  }

  if (salsaSeleccionada) {
    linea +=
      " | Salsa: " +
      salsaSeleccionada;
  }

  if (saborSeleccionado) {
    linea +=
      " | Sabor: " +
      saborSeleccionado;
  }

  if (especialidadSeleccionada) {
    linea +=
      " | Especialidad: " +
      especialidadSeleccionada;
  }

  if (rellenosSeleccionados.length > 0) {
    linea +=
      " | Rellenos: " +
      rellenosSeleccionados.join(", ");
  }

  if (frutasSeleccionadas.length > 0) {
    linea +=
      " | Frutas: " +
      frutasSeleccionadas.join(", ");
  }

  if (coberturasSeleccionadas.length > 0) {
    linea +=
      " | Coberturas: " +
      coberturasSeleccionadas.join(", ");
  }

  if (toppingsSeleccionados.length > 0) {
    linea +=
      " | Toppings: " +
      toppingsSeleccionados.join(", ");
  }

  if (marcaSeleccionada) {
    linea +=
      " | Marca: " +
      marcaSeleccionada;
  }

  if (presentacionSeleccionada) {
    linea +=
      " | Presentación: " +
      presentacionSeleccionada;
  }

  if (instrucciones) {
    linea +=
      " | Nota: " +
      instrucciones;
  }

  setProductosNuevoPedido(function (actuales) {
    return [
      ...actuales,
      linea,
    ];
  });

  setTotalNuevoPedido(function (actual) {
    return actual + precioFinal;
  });
}
function crearNuevoPedido() {
  if (productosNuevoPedido.length === 0) {
    return;
  }

  const siguienteId =
    pedidos.length > 0
      ? Math.max.apply(
          null,
          pedidos.map(function (pedido) {
            return pedido.id;
          })
        ) + 1
      : 1001;

  const origen =
    tipoNuevoPedido === "Mesa"
      ? "Mesa " + mesaNuevoPedido + " · Empleado"
      : tipoNuevoPedido === "Para llevar"
      ? "Para llevar · Empleado"
      : "Domicilio · Empleado";

  const nuevoPedido: Pedido = {
    id: siguienteId,
    origen: origen,
    cliente:
      clienteNuevoPedido ||
      (tipoNuevoPedido === "Mesa"
        ? "Mesa " + mesaNuevoPedido
        : "Cliente"),
    hora: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    productos: productosNuevoPedido,
    total: totalNuevoPedido,
    estado: "nuevo",
  };

  setPedidos(function (actuales) {
    return [
      ...actuales,
      nuevoPedido,
    ];
  });

  setMostrarNuevoPedido(false);
  setTipoNuevoPedido("Mesa");
  setMesaNuevoPedido("");
  setClienteNuevoPedido("");
  setProductosNuevoPedido([]);
  setTotalNuevoPedido(0);
}
  async function cambiarEstado(
  id: number,
  nuevoEstado: Estado
) {
  const { error } = await supabase
    .from("pedidos")
    .update({
      estado: nuevoEstado,
    })
    .eq("numero_pedido", id);

  if (error) {
    console.error(
      "Error actualizando estado:",
      error
    );
    return;
  }

  setPedidos(function (actuales) {
    return actuales.map(function (pedido) {
      if (pedido.id === id) {
        return {
          ...pedido,
          estado: nuevoEstado,
        };
      }

      return pedido;
    });
  });

  setPedidoSeleccionado(function (actual) {
    if (actual && actual.id === id) {
      return {
        ...actual,
        estado: nuevoEstado,
      };
    }

    return actual;
  });
}

  function agregarProducto(
    pedidoId: number,
    producto: Producto
  ) {
    setProductoParaPersonalizar(producto);
    setMostrarPersonalizador(true);
  }

  function agregarProductoPersonalizado(
    pedidoId: number,
    producto: Producto,
    extrasSeleccionados: Extra[],
    salsaSeleccionada: string,
    saborSeleccionado: string,
    especialidadSeleccionada: string,
    rellenosSeleccionados: string[],
    frutasSeleccionadas: string[],
    coberturasSeleccionadas: string[],
    toppingsSeleccionados: string[],
    marcaSeleccionada: string,
    presentacionSeleccionada: string,
    instrucciones: string
  ) {
    const precioExtras =
      extrasSeleccionados.reduce(function (
        suma,
        extra
      ) {
        return suma + extra.precio;
      }, 0);

    const precioFinal =
      producto.precio + precioExtras;

    let linea =
      "1x " +
      producto.nombre +
      " — $" +
      precioFinal;

    if (extrasSeleccionados.length > 0) {
      linea =
        linea +
        " | Extras: " +
        extrasSeleccionados
          .map(function (extra) {
            return extra.nombre;
          })
          .join(", ");
    }

    if (salsaSeleccionada) {
      linea =
        linea +
        " | Salsa: " +
        salsaSeleccionada;
    }

    if (saborSeleccionado) {
      linea =
        linea +
        " | Sabor: " +
        saborSeleccionado;
    }
    if (especialidadSeleccionada) {
  linea =
    linea +
    " | Especialidad: " +
    especialidadSeleccionada;
}

    if (rellenosSeleccionados.length > 0) {
      linea =
        linea +
        " | Rellenos: " +
        rellenosSeleccionados.join(", ");
    }

    if (frutasSeleccionadas.length > 0) {
      linea =
        linea +
        " | Frutas: " +
        frutasSeleccionadas.join(", ");
    }

    if (coberturasSeleccionadas.length > 0) {
      linea =
        linea +
        " | Coberturas: " +
        coberturasSeleccionadas.join(", ");
    }

    if (toppingsSeleccionados.length > 0) {
      linea =
        linea +
        " | Toppings: " +
        toppingsSeleccionados.join(", ");
    }

    if (marcaSeleccionada) {
      linea =
        linea +
        " | Marca: " +
        marcaSeleccionada;
    }

    if (presentacionSeleccionada) {
      linea =
        linea +
        " | Presentación: " +
        presentacionSeleccionada;
    }

    if (instrucciones) {
      linea =
        linea +
        " | Nota: " +
        instrucciones;
    }

    setPedidos(function (actuales) {
      return actuales.map(function (pedido) {
        if (pedido.id === pedidoId) {
          return {
            ...pedido,
            productos: [
              ...pedido.productos,
              linea,
            ],
            total:
              pedido.total + precioFinal,
          };
        }

        return pedido;
      });
    });

    setPedidoSeleccionado(function (actual) {
      if (actual && actual.id === pedidoId) {
        return {
          ...actual,
          productos: [
            ...actual.productos,
            linea,
          ],
          total:
            actual.total + precioFinal,
        };
      }

      return actual;
    });

    setProductoParaPersonalizar(null);
    setMostrarPersonalizador(false);
  }
  const nuevos = pedidos.filter(function (pedido) {
    return pedido.estado === "nuevo";
  });

  const preparacion = pedidos.filter(function (pedido) {
    return pedido.estado === "preparacion";
  });

  const listos = pedidos.filter(function (pedido) {
    return pedido.estado === "listo";
  });

  const totalVentas = pedidos.reduce(function (
    total,
    pedido
  ) {
    return total + pedido.total;
  }, 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#090909",
        color: "white",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            BLACK GRILL
          </h1>

          <p
            style={{
              color: "#aaa",
              marginTop: "6px",
            }}
          >
            Panel de restaurante
          </p>
        </div>

        <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }}
>
  <button
    onClick={function () {
      setMostrarNuevoPedido(true);
    }}
    style={{
      background: "#e87500",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "10px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    + Nuevo pedido
  </button>

  <div
    style={{
      background: "#151515",
      padding: "12px 18px",
      borderRadius: "10px",
    }}
  >
    🟢 Sistema activo
  </div>
</div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <Resumen
          titulo="Pedidos nuevos"
          valor={nuevos.length}
        />

        <Resumen
          titulo="En preparación"
          valor={preparacion.length}
        />

        <Resumen
          titulo="Listos"
          valor={listos.length}
        />

        <Resumen
          titulo="Ventas"
          valor={"$" + totalVentas}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: pedidoSeleccionado
            ? "repeat(3, minmax(260px, 1fr)) 360px"
            : "repeat(3, minmax(260px, 1fr))",
          gap: "18px",
          alignItems: "start",
        }}
      >
        <Columna
          titulo="NUEVOS"
          pedidos={nuevos}
          boton="Aceptar pedido"
          siguiente="preparacion"
          cambiarEstado={cambiarEstado}
          onSeleccionar={setPedidoSeleccionado}
        />

        <Columna
          titulo="EN PREPARACIÓN"
          pedidos={preparacion}
          boton="Marcar como listo"
          siguiente="listo"
          cambiarEstado={cambiarEstado}
          onSeleccionar={setPedidoSeleccionado}
        />

        <Columna
          titulo="LISTOS"
          pedidos={listos}
          boton="Entregado"
          siguiente="listo"
          cambiarEstado={cambiarEstado}
          onSeleccionar={setPedidoSeleccionado}
        />

        {pedidoSeleccionado && (
          <DetallePedido
            pedido={pedidoSeleccionado}
            cambiarEstado={cambiarEstado}
            agregarProducto={agregarProducto}
            cerrar={function () {
              setPedidoSeleccionado(null);
            }}
          />
        )}

        {mostrarPersonalizador && (
          <PersonalizarProducto
            abierto={mostrarPersonalizador}
            producto={productoParaPersonalizar}
            onCerrar={function () {
              setMostrarPersonalizador(false);
              setProductoParaPersonalizar(null);
            }}
            onAgregar={function (
              producto,
              extrasSeleccionados,
              salsaSeleccionada,
              saborSeleccionado,
              especialidadSeleccionada,
              rellenosSeleccionados,
              frutasSeleccionadas,
              coberturasSeleccionadas,
              toppingsSeleccionados,
              marcaSeleccionada,
              presentacionSeleccionada,
              instrucciones
            ) {
             if (agregandoNuevoPedido) {
  agregarProductoNuevoPedido(
    producto,
    extrasSeleccionados,
    salsaSeleccionada,
    saborSeleccionado,
    especialidadSeleccionada,
    rellenosSeleccionados,
    frutasSeleccionadas,
    coberturasSeleccionadas,
    toppingsSeleccionados,
    marcaSeleccionada,
    presentacionSeleccionada,
    instrucciones
  );

  setAgregandoNuevoPedido(false);
  setMostrarPersonalizador(false);
  setProductoParaPersonalizar(null);

  return;
}

if (!pedidoSeleccionado) {
  return;
}

              agregarProductoPersonalizado(
                pedidoSeleccionado.id,
                producto,
                extrasSeleccionados,
                salsaSeleccionada,
                saborSeleccionado,
                especialidadSeleccionada,
                rellenosSeleccionados,
                frutasSeleccionadas,
                coberturasSeleccionadas,
                toppingsSeleccionados,
                marcaSeleccionada,
                presentacionSeleccionada,
                instrucciones
              );
            }}
          />
        )}
        {mostrarNuevoPedido && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1500,
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#151515",
                border: "1px solid #333",
                borderRadius: "16px",
                padding: "22px",
                color: "white",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ margin: 0 }}>
                  NUEVO PEDIDO
                </h2>

                <button
                  onClick={function () {
                    setMostrarNuevoPedido(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#aaa",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>

              <label
                style={{
                  display: "block",
                  color: "#aaa",
                  marginBottom: "6px",
                }}
              >
                Tipo de pedido
              </label>

              <select
                value={tipoNuevoPedido}
                onChange={function (evento) {
                  setTipoNuevoPedido(evento.target.value);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "14px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #555",
                  borderRadius: "8px",
                }}
              >
                <option value="Mesa">
                  Mesa
                </option>

                <option value="Para llevar">
                  Para llevar
                </option>

                <option value="Domicilio">
                  Domicilio
                </option>
              </select>

              {tipoNuevoPedido === "Mesa" && (
                <>
                  <label
                    style={{
                      display: "block",
                      color: "#aaa",
                      marginBottom: "6px",
                    }}
                  >
                    Número de mesa
                  </label>

                  <input
                    value={mesaNuevoPedido}
                    onChange={function (evento) {
                      setMesaNuevoPedido(
                        evento.target.value
                      );
                    }}
                    placeholder="Ej. 4"
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "14px",
                      background: "#111",
                      color: "white",
                      border: "1px solid #555",
                      borderRadius: "8px",
                      boxSizing: "border-box",
                    }}
                  />
                </>
              )}

              <label
                style={{
                  display: "block",
                  color: "#aaa",
                  marginBottom: "6px",
                }}
              >
                Cliente
              </label>

              <input
                value={clienteNuevoPedido}
                onChange={function (evento) {
                  setClienteNuevoPedido(
                    evento.target.value
                  );
                }}
                placeholder="Nombre del cliente (opcional)"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "18px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #555",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />

              <h3
                style={{
                  color: "#F59E0B",
                  fontSize: "15px",
                }}
              >
                PRODUCTOS
              </h3>

              <select
                value={
                  productoParaPersonalizar
                    ? String(
                        productoParaPersonalizar.id
                      )
                    : ""
                }
                onChange={function (evento) {
                  const producto =
                    productos.find(function (item) {
                      return (
                        String(item.id) ===
                        evento.target.value
                      );
                    });

                  if (producto) {
                    setProductoParaPersonalizar(
                      producto
                    );
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#111",
                  color: "white",
                  border: "1px solid #555",
                  borderRadius: "8px",
                }}
              >
                <option value="">
                  Selecciona un producto
                </option>

                {productos.map(function (producto) {
                  return (
                    <option
                      key={producto.id}
                      value={String(producto.id)}
                    >
                      {producto.nombre} — $
                      {producto.precio}
                    </option>
                  );
                })}
              </select>

              <button
               onClick={function () {
  if (!productoParaPersonalizar) {
    return;
  }

  setAgregandoNuevoPedido(true);
  setMostrarPersonalizador(true);
}}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "12px",
                  background: "#e87500",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + Personalizar y agregar
              </button>

              {productosNuevoPedido.length > 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    borderTop: "1px solid #333",
                    paddingTop: "15px",
                  }}
                >
                  {productosNuevoPedido.map(
                    function (producto, index) {
                      return (
                        <div
                          key={index}
                          style={{
                            padding: "8px 0",
                            color: "#ddd",
                          }}
                        >
                          {producto}
                        </div>
                      );
                    }
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      paddingTop: "12px",
                      borderTop: "1px solid #444",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Total</span>

                    <span
                      style={{
                        color: "#F59E0B",
                      }}
                    >
                      ${totalNuevoPedido}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={crearNuevoPedido}
                disabled={
                  productosNuevoPedido.length === 0
                }
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  background:
                    productosNuevoPedido.length === 0
                      ? "#444"
                      : "#F59E0B",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor:
                    productosNuevoPedido.length === 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Crear pedido
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Resumen({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string | number;
}) {
  return (
    <div
      style={{
        background: "#151515",
        border: "1px solid #292929",
        borderRadius: "14px",
        padding: "20px",
      }}
    >
      <div
        style={{
          color: "#aaa",
          marginBottom: "8px",
        }}
      >
        {titulo}
      </div>

      <strong
        style={{
          fontSize: "28px",
        }}
      >
        {valor}
      </strong>
    </div>
  );
}

function Columna({
  titulo,
  pedidos,
  boton,
  siguiente,
  cambiarEstado,
  onSeleccionar,
}: {
  titulo: string;
  pedidos: Pedido[];
  boton: string;
  siguiente: Estado;
  cambiarEstado: (
    id: number,
    estado: Estado
  ) => void;
  onSeleccionar: (pedido: Pedido) => void;
}) {
  return (
    <section
      style={{
        background: "#101010",
        border: "1px solid #292929",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          marginTop: 0,
          marginBottom: "16px",
        }}
      >
        {titulo} ({pedidos.length})
      </h2>

      {pedidos.map(function (pedido) {
        return (
          <article
            key={pedido.id}
            onClick={function () {
              onSeleccionar(pedido);
            }}
            style={{
              background: "#181818",
              border: "1px solid #303030",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <strong>{pedido.cliente}</strong>

              <span
                style={{
                  color: "#ff8a00",
                }}
              >
                {pedido.hora}
              </span>
            </div>

            <div
              style={{
                color: "#ff8a00",
                fontSize: "14px",
                marginBottom: "14px",
              }}
            >
              {pedido.origen}
            </div>

            <div
              style={{
                marginBottom: "14px",
              }}
            >
              {pedido.productos.map(function (
                producto,
                index
              ) {
                return (
                  <div
                    key={index}
                    style={{
                      padding: "5px 0",
                      color: "#ddd",
                      fontSize: "14px",
                    }}
                  >
                    {producto}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                borderTop: "1px solid #333",
                paddingTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>Total</span>

              <span
                style={{
                  color: "#ff8a00",
                }}
              >
                {"$" + pedido.total}
              </span>
            </div>

            <button
              onClick={function (evento) {
                evento.stopPropagation();
                onSeleccionar(pedido);
              }}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                border: "1px solid #555",
                borderRadius: "8px",
                background: "#222222",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Ver detalle
            </button>

            <button
              onClick={function (evento) {
                evento.stopPropagation();

                cambiarEstado(
                  pedido.id,
                  siguiente
                );
              }}
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#e87500",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✓ {boton}
            </button>
          </article>
        );
      })}

      {pedidos.length === 0 && (
        <div
          style={{
            color: "#777",
            textAlign: "center",
            padding: "30px",
          }}
        >
          No hay pedidos
        </div>
      )}
    </section>
  );
}
function DetallePedido({
  pedido,
  cambiarEstado,
  agregarProducto,
  cerrar,
}: {
  pedido: Pedido;
  cambiarEstado: (
    id: number,
    estado: Estado
  ) => void;
  agregarProducto: (
    pedidoId: number,
    producto: Producto
  ) => void;
  cerrar: () => void;
}) {
  const [mostrarProductos, setMostrarProductos] =
    useState(false);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState("");

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "360px",
        height: "100vh",
        background: "#111111",
        borderLeft: "1px solid #303030",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
        zIndex: 1000,
        boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
          }}
        >
          DETALLE DEL PEDIDO
        </h2>

        <button
          onClick={cerrar}
          style={{
            background: "transparent",
            color: "#aaa",
            border: "none",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>

      <div
        style={{
          borderBottom: "1px solid #333",
          paddingBottom: "18px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          {pedido.cliente}
        </div>

        <div
          style={{
            color: "#ff8a00",
            marginBottom: "6px",
          }}
        >
          {pedido.origen}
        </div>

        <div style={{ color: "#999" }}>
          Pedido #{pedido.id}
        </div>

        <div style={{ color: "#999" }}>
          {pedido.hora}
        </div>
      </div>

      <h3
        style={{
          fontSize: "14px",
          color: "#ff8a00",
          marginBottom: "14px",
        }}
      >
        PRODUCTOS
      </h3>

      <div>
        {pedido.productos.map(function (
          producto,
          index
        ) {
          return (
            <div
              key={index}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #292929",
                color: "#ddd",
              }}
            >
              {producto}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid #444",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <span>Total</span>

        <span style={{ color: "#ff8a00" }}>
          {"$" + pedido.total}
        </span>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={function () {
            if (pedido.estado === "nuevo") {
              cambiarEstado(
                pedido.id,
                "preparacion"
              );
            } else if (
              pedido.estado === "preparacion"
            ) {
              cambiarEstado(
                pedido.id,
                "listo"
              );
            }
          }}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "8px",
            background: "#e87500",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {pedido.estado === "nuevo"
            ? "Mover a preparación"
            : pedido.estado === "preparacion"
            ? "Marcar como listo"
            : "Pedido listo"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={function () {
            setMostrarProductos(true);
          }}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#191919",
            color: "white",
            cursor: "pointer",
          }}
        >
          + Agregar producto
        </button>

        <button
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#191919",
            color: "white",
            cursor: "pointer",
          }}
        >
          Imprimir
        </button>
      </div>

      {mostrarProductos && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            background: "#191919",
            border: "1px solid #444",
            borderRadius: "10px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#ff8a00",
            }}
          >
            AGREGAR PRODUCTO
          </h3>

          <select
            value={productoSeleccionado}
            onChange={function (evento) {
              setProductoSeleccionado(
                evento.target.value
              );
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#111111",
              color: "white",
              border: "1px solid #555",
              borderRadius: "8px",
            }}
          >
            <option value="">
              Selecciona un producto
            </option>

            {productos.map(function (producto) {
              return (
                <option
                  key={producto.id}
                  value={String(producto.id)}
                >
                  {producto.nombre} — $
                  {producto.precio}
                </option>
              );
            })}
          </select>

          <button
            onClick={function () {
              const producto =
                productos.find(function (item) {
                  return (
                    String(item.id) ===
                    productoSeleccionado
                  );
                });

              if (!producto) {
                return;
              }

              agregarProducto(
                pedido.id,
                producto
              );

              setProductoSeleccionado("");
              setMostrarProductos(false);
            }}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#e87500",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Personalizar producto
          </button>
        </div>
      )}
    </aside>
  );
}