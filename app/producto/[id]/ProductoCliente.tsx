"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Producto, Extra, ProductoCarrito } from "@/types/producto";

type Props = {
  producto: Producto;
};

export default function ProductoCliente({ producto }: Props) {
  const router = useRouter();

  const [extrasSeleccionados, setExtrasSeleccionados] = useState<Extra[]>([]);
  const [instrucciones, setInstrucciones] = useState("");
const [salsasSeleccionadas, setSalsasSeleccionadas] = useState<string[]>([]);
const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
const [presentacionSeleccionada, setPresentacionSeleccionada] = useState("");
const [saborSeleccionado, setSaborSeleccionado] = useState("");
const [rellenosSeleccionados, setRellenosSeleccionados] = useState<string[]>([]);
const [frutaSeleccionada, setFrutaSeleccionada] = useState("");
const [coberturaSeleccionada, setCoberturaSeleccionada] = useState("");
const [toppingsSeleccionados, setToppingsSeleccionados] = useState<string[]>([]);
  const precioFinal = useMemo(() => {
    return (
      producto.precio +
      extrasSeleccionados.reduce(
        (total, extra) => total + extra.precio,
        0
      )
    );
  }, [producto.precio, extrasSeleccionados]);
  

  function cambiarExtra(extra: Extra) {
  const existe = extrasSeleccionados.some(
    (e) => e.nombre === extra.nombre
  );

  if (existe) {
    setExtrasSeleccionados(
      extrasSeleccionados.filter(
        (e) => e.nombre !== extra.nombre
      )
    );
  } else {
    setExtrasSeleccionados([
      ...extrasSeleccionados,
      extra,
    ]);
  }
}

function cambiarSalsa(salsa: string) {
  const existe = salsasSeleccionadas.includes(salsa);

  if (existe) {
    setSalsasSeleccionadas(
      salsasSeleccionadas.filter((s) => s !== salsa)
    );
    return;
  }

  if (salsasSeleccionadas.length >= 2) {
    alert("Solo puedes seleccionar hasta dos salsas.");
    return;
  }
  setSalsasSeleccionadas([
    ...salsasSeleccionadas,
    salsa,
  ]);
}
function cambiarRelleno(relleno: string) {
  const existe = rellenosSeleccionados.includes(relleno);

  if (existe) {
    setRellenosSeleccionados(
      rellenosSeleccionados.filter((r) => r !== relleno)
    );
    return;
  }

  if (rellenosSeleccionados.length >= 2) {
    alert("Solo puedes seleccionar hasta dos rellenos.");
    return;
  }

  setRellenosSeleccionados([
    ...rellenosSeleccionados,
    relleno,
  ]);
}
function cambiarTopping(topping: string) {
  const existe = toppingsSeleccionados.includes(topping);

  if (existe) {
    setToppingsSeleccionados(
      toppingsSeleccionados.filter((t) => t !== topping)
    );
    return;
  }

  const limite = producto.maxToppings ?? 1;

  if (toppingsSeleccionados.length >= limite) {
    alert("Solo puedes seleccionar hasta " + limite + " topping(s).");
    return;
  }

  setToppingsSeleccionados([
    ...toppingsSeleccionados,
    topping,
  ]);
}
return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
        color: "white",
      }}
    >
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={700}
        height={450}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          color: "#F59E0B",
          fontSize: "38px",
          marginBottom: "10px",
        }}
      >
        {producto.nombre}
      </h1>

      <h2
        style={{
          color: "#22C55E",
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        ${precioFinal}
      </h2>

      <p
        style={{
          color: "#D1D5DB",
          lineHeight: "1.7",
          marginBottom: "25px",
        }}
      >
        {producto.descripcion}
      </p>

      {producto.extras && producto.extras.length > 0 && (
        <>
        <h3
  style={{
    color: "#F59E0B",
    marginBottom: "15px",
  }}
>
  {producto.categoria === "Crepas"
    ? "🥞 Elige tu especialidad"
    : producto.categoria === "Helados"
    ? "🍨 Elige el sabor de tu helado"
    : producto.categoria === "Frappés"
    ? "🧋 Elige el sabor de tu frappé"
    : producto.categoria === "Malteadas"
    ? "🥤 Elige el sabor de tu malteada"
    : producto.categoria === "Boneless"
    ? "🍗 ¿Qué salsa deseas?"
    : producto.categoria === "Alitas"
    ? "🍗 ¿Qué salsa deseas?"
   : producto.categoria === "Costillas"
? "🍖 Elige tus complementos"
: producto.categoria === "Hamburguesas"
? "🍔 Elige tus extras"
: "🥤 ¿Qué refresco deseas?"}
</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            {producto.extras.map((extra) => (
              <label
                key={extra.nombre}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#1F2937",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <span>
                  {extra.nombre} (+${extra.precio})
                </span>

                <input
                  type="checkbox"
                  checked={extrasSeleccionados.some(
                    (e) => e.nombre === extra.nombre
                  )}
                  onChange={() => cambiarExtra(extra)}
                />
              </label>
            ))}
          </div>
        </>
      )}

  {producto.marcas && producto.marcas.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      Marca
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.marcas.map((marca) => (
        <label
          key={marca}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{marca}</span>

          <input
            type="radio"
            name="marca"
            checked={marcaSeleccionada === marca}
            onChange={() => setMarcaSeleccionada(marca)}
          />
        </label>
      ))}
    </div>
  </>
)}

{producto.presentaciones && producto.presentaciones.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      ¿Cómo la quieres?
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.presentaciones.map((presentacion) => (
        <label
          key={presentacion}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{presentacion}</span>

          <input
            type="radio"
            name="presentacion"
            checked={presentacionSeleccionada === presentacion}
            onChange={() => setPresentacionSeleccionada(presentacion)}
          />
        </label>
      ))}
    </div>
  </>
)}
{producto.sabores && producto.sabores.length > 0 && (
  <>
    <h3
  style={{
    color: "#F59E0B",
    marginBottom: "15px",
  }}
>
 {producto.categoria === "Crepas"
  ? "🥞 Elige tu especialidad"
  : producto.categoria === "Helados"
  ? "🍦 Elige el sabor del helado"
  : producto.categoria === "Frappés"
  ? "🧋 Elige el sabor de tu frappé"
  : producto.categoria === "Malteadas"
  ? "🥤 Elige el sabor de tu malteada"
  : "🥤 ¿Qué refresco deseas?"}
</h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.sabores.map((sabor) => (
        <label
          key={sabor}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{sabor}</span>

          <input
            type="radio"
            name="sabor"
            checked={saborSeleccionado === sabor}
            onChange={() => setSaborSeleccionado(sabor)}
          />
        </label>
      ))}
    </div>
  </>
)}
    {producto.rellenos && producto.rellenos.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      🥞 Elige hasta 2 rellenos
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.rellenos.map((relleno) => (
        <label
          key={relleno}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{relleno}</span>

          <input
            type="checkbox"
            checked={rellenosSeleccionados.includes(relleno)}
            onChange={() => cambiarRelleno(relleno)}
          />
        </label>
      ))}
    </div>
  </>
)}
{producto.frutas && producto.frutas.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      🍓 Elige una fruta
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.frutas.map((fruta) => (
        <label
          key={fruta}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{fruta}</span>

          <input
            type="radio"
            name="fruta"
            checked={frutaSeleccionada === fruta}
            onChange={() => setFrutaSeleccionada(fruta)}
          />
        </label>
      ))}
    </div>
  </>
)}
{producto.coberturas && producto.coberturas.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      🍫 Elige una cobertura
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.coberturas.map((cobertura) => (
        <label
          key={cobertura}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{cobertura}</span>

          <input
            type="radio"
            name="cobertura"
            checked={coberturaSeleccionada === cobertura}
            onChange={() => setCoberturaSeleccionada(cobertura)}
          />
        </label>
      ))}
    </div>
  </>
)}
{producto.toppings && producto.toppings.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      🍬 Elige hasta {producto.maxToppings} topping
      {producto.maxToppings! > 1 ? "s" : ""}
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.toppings.map((topping) => (
        <label
          key={topping}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{topping}</span>

          <input
            type="checkbox"
            checked={toppingsSeleccionados.includes(topping)}
            onChange={() => cambiarTopping(topping)}
          />
        </label>
      ))}
    </div>
  </>
)}
    {producto.salsas && producto.salsas.length > 0 && (
  <>
    <h3
      style={{
        color: "#F59E0B",
        marginBottom: "15px",
      }}
    >
      Elige tu salsa
    </h3>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
      }}
    >
      {producto.salsas.map((salsa) => (
        <label
          key={salsa}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1F2937",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <span>{salsa}</span>

          <input
  type="checkbox"
  checked={salsasSeleccionadas.includes(salsa)}
  onChange={() => cambiarSalsa(salsa)}
/>
        </label>
      ))}
    </div>
  </>
)}
      <div style={{ marginBottom: "25px" }}>

        <label
          style={{
            display: "block",
            marginBottom: "10px",
            color: "#F59E0B",
            fontWeight: "bold",
          }}
        >
          📝 Instrucciones especiales
        </label>

        <textarea
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
          placeholder="Ej. Sin cebolla, bien cocida, salsa aparte..."
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #374151",
            backgroundColor: "#1F2937",
            color: "white",
            resize: "none",
            fontSize: "16px",
          }}
        />
      </div>
      <button
        onClick={() => {
          
            if (
  producto.salsas &&
  salsasSeleccionadas.length === 0
) {
  alert("Selecciona al menos una salsa.");
  return;
}
if (
  producto.sabores &&
  !saborSeleccionado
) {
  alert("Selecciona un refresco.");
  return;
}
if (
  producto.marcas &&
  !marcaSeleccionada
) {
  alert("Selecciona una marca.");
  return;
}

if (
  producto.presentaciones &&
  !presentacionSeleccionada
) {
  alert("Selecciona cómo la quieres.");
  return;
}
if (
  producto.rellenos &&
  rellenosSeleccionados.length === 0
) {
  alert("Selecciona al menos un relleno.");
  return;
}

if (
  producto.frutas &&
  !frutaSeleccionada
) {
  alert("Selecciona una fruta.");
  return;
}

if (
  producto.coberturas &&
  !coberturaSeleccionada
) {
  alert("Selecciona una cobertura.");
  return;
}
if (
  producto.toppings &&
  producto.toppings.length > 0 &&
  toppingsSeleccionados.length !== (producto.maxToppings ?? 1)
) {
  alert(
    `Selecciona ${producto.maxToppings} topping${
      producto.maxToppings! > 1 ? "s" : ""
    }.`
  );
  return;
}
          const nuevoProducto: ProductoCarrito = {
  ...producto,
  cantidad: 1,
  extrasSeleccionados,
  salsasSeleccionadas,
  saborSeleccionado,
  rellenosSeleccionados,
  frutaSeleccionada,
  coberturaSeleccionada,
  toppingsSeleccionados,
  marcaSeleccionada,
  presentacionSeleccionada,
  instrucciones,
  precioFinal,
};

          const carrito: ProductoCarrito[] = JSON.parse(
            localStorage.getItem("carrito") || "[]"
          );

          carrito.push(nuevoProducto);

          localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
          );

          router.push("/menu");
        }}
        style={{
          width: "100%",
          padding: "18px",
          backgroundColor: "#22C55E",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        🛒 Agregar al carrito
      </button>
    </main>
  );
}