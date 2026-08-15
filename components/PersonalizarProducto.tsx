"use client";

import { useState } from "react";
import { Producto, Extra } from "@/types/producto";

type Props = {
  abierto: boolean;
  producto: Producto | null;
  onCerrar: () => void;

  onAgregar: (
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
  ) => void;
};

export default function PersonalizarProducto({
  abierto,
  producto,
  onCerrar,
  onAgregar,
}: Props) {
  const [extrasSeleccionados, setExtrasSeleccionados] =
    useState<Extra[]>([]);

  const [salsaSeleccionada, setSalsaSeleccionada] =
    useState("");

  const [saborSeleccionado, setSaborSeleccionado] =
    useState("");
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  const [rellenosSeleccionados, setRellenosSeleccionados] =
    useState<string[]>([]);

  const [frutasSeleccionadas, setFrutasSeleccionadas] =
    useState<string[]>([]);

  const [coberturasSeleccionadas, setCoberturasSeleccionadas] =
    useState<string[]>([]);

  const [toppingsSeleccionados, setToppingsSeleccionados] =
    useState<string[]>([]);

  const [marcaSeleccionada, setMarcaSeleccionada] =
    useState("");

  const [presentacionSeleccionada, setPresentacionSeleccionada] =
    useState("");

  const [instrucciones, setInstrucciones] =
    useState("");

  if (!abierto || !producto) {
    return null;
  }

  function alternarOpcion(
    lista: string[],
    opcion: string,
    setLista: (valor: string[]) => void,
    maximo?: number
  ) {
    if (lista.includes(opcion)) {
      setLista(
        lista.filter(function (item) {
          return item !== opcion;
        })
      );
      return;
    }

    if (maximo && lista.length >= maximo) {
      return;
    }

    setLista([
      ...lista,
      opcion,
    ]);
  }

  function seleccionarExtra(extra: Extra) {
    const existe = extrasSeleccionados.some(
      function (item) {
        return item.nombre === extra.nombre;
      }
    );

    if (existe) {
      setExtrasSeleccionados(
        extrasSeleccionados.filter(
          function (item) {
            return item.nombre !== extra.nombre;
          }
        )
      );
    } else {
      setExtrasSeleccionados([
        ...extrasSeleccionados,
        extra,
      ]);
    }
  }

  const precioExtras =
    extrasSeleccionados.reduce(
      function (suma, extra) {
        return suma + extra.precio;
      },
      0
    );

  const total =
    producto.precio + precioExtras;

  function agregar() {
  if (!producto) {
    return;
  }

  onAgregar(
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

    setExtrasSeleccionados([]);
    setSalsaSeleccionada("");
    setSaborSeleccionado("");
    setEspecialidadSeleccionada("");
    setRellenosSeleccionados([]);
    setFrutasSeleccionadas([]);
    setCoberturasSeleccionadas([]);
    setToppingsSeleccionados([]);
    setMarcaSeleccionada("");
    setPresentacionSeleccionada("");
    setInstrucciones("");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E1E1E",
          color: "white",
          padding: "24px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "450px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#F59E0B",
              }}
            >
              Personalizar producto
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#aaa",
              }}
            >
              {producto.nombre}
            </p>
          </div>

          <button
            onClick={onCerrar}
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

        <div
          style={{
            borderBottom: "1px solid #333",
            paddingBottom: "15px",
            marginBottom: "15px",
          }}
        >
          <strong>
            Precio base: ${producto.precio}
          </strong>
        </div>

        {producto.extras &&
          producto.extras.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                EXTRAS
              </h3>

              {producto.extras.map(function (extra) {
                const seleccionado =
                  extrasSeleccionados.some(
                    function (item) {
                      return item.nombre === extra.nombre;
                    }
                  );

                return (
                  <label
                    key={extra.nombre}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      marginBottom: "6px",
                      background: seleccionado
                        ? "#292929"
                        : "#151515",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <span>
                      <input
                        type="checkbox"
                        checked={seleccionado}
                        onChange={function () {
                          seleccionarExtra(extra);
                        }}
                        style={{ marginRight: "10px" }}
                      />

                      {extra.nombre}
                    </span>

                    <span style={{ color: "#F59E0B" }}>
                      +${extra.precio}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

        {producto.salsas &&
          producto.salsas.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                SALSA
              </h3>

              <select
                value={salsaSeleccionada}
                onChange={function (evento) {
                  setSalsaSeleccionada(evento.target.value);
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
                  Selecciona una salsa
                </option>

                {producto.salsas.map(function (salsa) {
                  return (
                    <option key={salsa} value={salsa}>
                      {salsa}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {producto.sabores &&
          producto.sabores.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                SABOR
              </h3>

              <select
                value={saborSeleccionado}
                onChange={function (evento) {
                  setSaborSeleccionado(evento.target.value);
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
                  Selecciona un sabor
                </option>

                {producto.sabores.map(function (sabor) {
                  return (
                    <option key={sabor} value={sabor}>
                      {sabor}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

       {producto.especialidades &&
  producto.especialidades.length > 0 && (
    <div
      style={{
        marginBottom: "18px",
      }}
    >
      <h3
        style={{
          color: "#F59E0B",
          fontSize: "15px",
        }}
      >
        🥞 Elige tu especialidad
      </h3>

      {producto.especialidades.map(function (
        especialidad
      ) {
        const seleccionada =
          especialidadSeleccionada === especialidad;

        return (
          <label
            key={especialidad}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "6px",
              background: seleccionada
                ? "#292929"
                : "#151515",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <span>{especialidad}</span>

            <input
              type="radio"
              name="especialidad"
              checked={seleccionada}
              onChange={function () {
                setEspecialidadSeleccionada(
                  especialidad
                );
              }}
            />
          </label>
        );
      })}
    </div>
  )}
        {producto.frutas &&
          producto.frutas.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                FRUTAS
              </h3>

              {producto.frutas.map(function (fruta) {
                const seleccionado =
                  frutasSeleccionadas.includes(fruta);

                return (
                  <label
                    key={fruta}
                    style={{
                      display: "block",
                      padding: "10px",
                      marginBottom: "6px",
                      background: seleccionado
                        ? "#292929"
                        : "#151515",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionado}
                      onChange={function () {
                        alternarOpcion(
                          frutasSeleccionadas,
                          fruta,
                          setFrutasSeleccionadas
                        );
                      }}
                      style={{ marginRight: "10px" }}
                    />

                    {fruta}
                  </label>
                );
              })}
            </div>
          )}

        {producto.coberturas &&
          producto.coberturas.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                COBERTURAS
              </h3>

              {producto.coberturas.map(function (cobertura) {
                const seleccionado =
                  coberturasSeleccionadas.includes(cobertura);

                return (
                  <label
                    key={cobertura}
                    style={{
                      display: "block",
                      padding: "10px",
                      marginBottom: "6px",
                      background: seleccionado
                        ? "#292929"
                        : "#151515",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionado}
                      onChange={function () {
                        alternarOpcion(
                          coberturasSeleccionadas,
                          cobertura,
                          setCoberturasSeleccionadas,
                          producto.maxCoberturas
                        );
                      }}
                      style={{ marginRight: "10px" }}
                    />

                    {cobertura}
                  </label>
                );
              })}
            </div>
          )}
          {producto.toppings &&
          producto.toppings.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                TOPPINGS
              </h3>

              {producto.maxToppings && (
                <p
                  style={{
                    color: "#999",
                    fontSize: "13px",
                  }}
                >
                  Máximo: {producto.maxToppings}
                </p>
              )}

              {producto.toppings.map(function (topping) {
                const seleccionado =
                  toppingsSeleccionados.includes(topping);

                return (
                  <label
                    key={topping}
                    style={{
                      display: "block",
                      padding: "10px",
                      marginBottom: "6px",
                      background: seleccionado
                        ? "#292929"
                        : "#151515",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionado}
                      onChange={function () {
                        alternarOpcion(
                          toppingsSeleccionados,
                          topping,
                          setToppingsSeleccionados,
                          producto.maxToppings
                        );
                      }}
                      style={{ marginRight: "10px" }}
                    />

                    {topping}
                  </label>
                );
              })}
            </div>
          )}

        {producto.marcas &&
          producto.marcas.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                MARCA
              </h3>

              <select
                value={marcaSeleccionada}
                onChange={function (evento) {
                  setMarcaSeleccionada(evento.target.value);
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
                  Selecciona una marca
                </option>

                {producto.marcas.map(function (marca) {
                  return (
                    <option key={marca} value={marca}>
                      {marca}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

        {producto.presentaciones &&
          producto.presentaciones.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
                PRESENTACIÓN
              </h3>

              <select
                value={presentacionSeleccionada}
                onChange={function (evento) {
                  setPresentacionSeleccionada(evento.target.value);
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
                  Selecciona una presentación
                </option>

                {producto.presentaciones.map(function (
                  presentacion
                ) {
                  return (
                    <option
                      key={presentacion}
                      value={presentacion}
                    >
                      {presentacion}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ color: "#F59E0B", fontSize: "15px" }}>
            INSTRUCCIONES
          </h3>

          <textarea
            value={instrucciones}
            onChange={function (evento) {
              setInstrucciones(evento.target.value);
            }}
            placeholder="Ejemplo: sin cebolla, poco picante..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "10px",
              boxSizing: "border-box",
              background: "#111111",
              color: "white",
              border: "1px solid #555",
              borderRadius: "8px",
              resize: "vertical",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333",
            paddingTop: "15px",
            marginBottom: "15px",
          }}
        >
          <strong>Total</strong>

          <strong
            style={{
              color: "#F59E0B",
              fontSize: "22px",
            }}
          >
            ${total}
          </strong>
        </div>

        <button
          onClick={agregar}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#F59E0B",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Agregar a la cuenta
        </button>

        <button
          onClick={onCerrar}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#292929",
            color: "white",
            border: "1px solid #555",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}