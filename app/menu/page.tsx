"use client";

import Image from "next/image";
import { useEffect,useState } from "react";
import {useRouter} from "next/navigation";
import ProductoCard from "../../components/ProductoCard";
import Carrito from "../../components/Carrito";
import {productos} from "../lib/productos";

export default function Menu() {
 const [categoria, setCategoria] = useState("Hamburguesas");
const [busqueda, setBusqueda] = useState("");

const [carrito, setCarrito] = useState<any[]>([]);
const [mostrarCarrito, setMostrarCarrito] = useState(false);
const router = useRouter();
const mensajesBrasas: Record<string, string[]> = {
  Hamburguesas: [
    "🍔 ¡La BBQ Bacon es una de las favoritas!",
    "🧀 Agrégale queso extra y quedará increíble.",
    "🔥 Si tienes mucha hambre, pide un combo.",
  ],
  Alitas: [
    "🍗 ¿BBQ o Mango Habanero? ¡Las dos son deliciosas!",
    "😋 Pídelas con papas para completar la experiencia.",
    "🔥 ¡Las alitas recién hechas son irresistibles!",
  ],
  Boneless: [
    "🔥 Crujientes por fuera y jugosos por dentro.",
    "🍗 No olvides elegir tu salsa favorita.",
    "😎 Son perfectos para compartir.",
  ],
  Complementos: [
    "🍟 El acompañamiento perfecto para cualquier platillo.",
    "🧀 Unas papas siempre son buena idea.",
  ],
  Crepas: [
    "🥞 ¿Dulce o salada? ¡Las dos son deliciosas!",
    "🍫 Pregunta por los rellenos disponibles.",
  ],
  "Frappés": [
    "🧋 Un frappé bien frío siempre cae bien.",
    "🥤 El complemento perfecto para tu comida.",
  ],
  Malteadas: [
    "🥛 Cremosas y preparadas al momento.",
    "🍦 Ideales para acompañar una hamburguesa.",
  ],
  Bebidas: [
    "🥤 Refresca tu comida con tu bebida favorita.",
    "🧊 Bien fría sabe mejor.",
  ],
  Combos: [
    "🍔🍟 Más comida por un mejor precio.",
    "🔥 Los combos son la mejor opción si tienes mucha hambre.",
  ],
  Costillas: [
  "🍖 Costillas ahumadas con un sabor espectacular.",
  "🔥 Acompáñalas con papas para una comida completa.",
],

Helados: [
  "🍨 El postre perfecto para terminar tu comida.",
  "❄️ Refrescantes y deliciosos.",
],
};
console.log(categoria);
console.log(mensajesBrasas[categoria]);
const imagenBrasas: Record<string, string> = {
  Hamburguesas: "/images/brasas/brasas-hamburguesas.webp",
  Alitas: "/images/brasas/brasas-alitas.webp",
  Boneless: "/images/brasas/brasas-alitas.webp",
  Complementos: "/images/brasas/brasas-complementos.webp",
  Costillas: "/images/brasas/brasas-costillas.webp",
  Crepas: "/images/brasas/brasas-crepas.webp",
  "Frappés": "/images/brasas/brasas-frappe.webp",
  Malteadas: "/images/brasas/brasas-malteadas.webp",
  Bebidas: "/images/brasas/brasas-bebidas.webp",
  Combos: "/images/brasas/brasas-combos.webp",
  Helados: "/images/brasas/brasas-helados.webp",
};
const mensajeBrasas =
  mensajesBrasas[categoria][
    Math.floor(Math.random() * mensajesBrasas[categoria].length)
  ];
useEffect(() => {
  const datos = localStorage.getItem("carrito");

  if (datos) {
    setCarrito(JSON.parse(datos));
  }
  const parametros = new URLSearchParams(window.location.search);
const mesaQR = parametros.get("mesa");

if (mesaQR) {
  localStorage.setItem("mesa", mesaQR);
}
}, []);

function agregarAlCarrito(producto: any) {
  if (
    (producto.extras && producto.extras.length > 0) ||
    (producto.salsas && producto.salsas.length > 0) ||
    (producto.sabores && producto.sabores.length > 0) ||
    (producto.rellenos && producto.rellenos.length > 0) ||
    (producto.frutas && producto.frutas.length > 0) ||
    (producto.coberturas && producto.coberturas.length > 0) ||
    (producto.marcas && producto.marcas.length > 0) ||
    (producto.presentaciones && producto.presentaciones.length > 0)
  ) {
    router.push("/producto/" + producto.id);
    return;
  }

  const nuevoCarrito = [...carrito];
  const indice = nuevoCarrito.findIndex((item) => item.id === producto.id);

  if (indice >= 0) {
    nuevoCarrito[indice].cantidad++;
  } else {
    nuevoCarrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}
function aumentarCantidad(id: number) {
  const nuevoCarrito = carrito.map((item) =>
    item.id === id
      ? { ...item, cantidad: item.cantidad + 1 }
      : item
  );

  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}

function disminuirCantidad(id: number) {
  const nuevoCarrito = carrito
    .map((item) =>
      item.id === id
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    )
    .filter((item) => item.cantidad > 0);

  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}
function eliminarProducto(id: number) {
  const nuevoCarrito = carrito.filter((item) => item.id !== id);

  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}
function vaciarCarrito() {
  setCarrito([]);
  localStorage.removeItem("carrito");
}
function realizarPedido() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  router.push("/pedido");
}
  const productosFiltrados = productos.filter((producto) => {
  const texto = busqueda.trim().toLowerCase();

  if (!texto) {
    return producto.categoria === categoria;
  }

  return producto.nombre.toLowerCase().includes(texto);
});

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
       <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
  }}
>
  <Image
    src="/images/logo.jpeg"
    alt="Black Grill"
    width={60}
    height={60}
    style={{
      borderRadius: "50%",
    }}
  />

  <div>
    <p
      style={{
        margin: 0,
        color: "#9CA3AF",
        fontSize: "13px",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      Bienvenido
    </p>

    <h1
      style={{
        margin: "4px 0",
        color: "#F59E0B",
        fontSize: "30px",
        fontWeight: "800",
      }}
    >
      BLACK GRILL
    </h1>

    <p
      style={{
        margin: 0,
        color: "#E5E7EB",
        fontSize: "15px",
      }}
    >
      🔥 El sabor que enciende tus sentidos
    </p>
  </div>
</div>
       <button
  onClick={() => setMostrarCarrito(!mostrarCarrito)}
  style={{
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#F59E0B",
    color: "black",
    border: "none",
    fontWeight: "bold",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: 1000,
    boxShadow: "0 6px 20px rgba(0,0,0,.35)",
  }}
>
  🛒 {carrito.reduce((total, item) => total + item.cantidad, 0)}
</button>
      </div>
{/* Hero principal */}

<div
  style={{
    background: "linear-gradient(135deg, #2B0A0A, #111827)",
    borderRadius: "25px",
    padding: "30px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  }}
>
  <div style={{ flex: 1, minWidth: "280px" }}>
    <span
      style={{
        backgroundColor: "#DC2626",
        color: "white",
        padding: "6px 14px",
        borderRadius: "999px",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      🔥 Producto estrella
    </span>

    <h2
      style={{
        color: "white",
        fontSize: "42px",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      BBQ Bacon
    </h2>

    <p
      style={{
        color: "#D1D5DB",
        fontSize: "18px",
        lineHeight: 1.6,
      }}
    >
      Carne 100% de res, queso americano, tocino crujiente y nuestra salsa especial.
    </p>

    <button
      onClick={() => {
  setCategoria("Hamburguesas");
  window.scrollTo({
    top: 1100,
    behavior: "smooth",
  });
}}
      style={{
        marginTop: "20px",
        backgroundColor: "#F59E0B",
        color: "#111",
        border: "none",
        padding: "14px 24px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      🍔 Ordenar ahora
    </button>
  </div>

  <Image
  src="/images/brasas/brasas-hamburguesas.webp"
  alt="Brasas con hamburguesa"
  width={360}
  height={360}
  priority
  style={{
    objectFit: "contain",
    filter: "drop-shadow(0 12px 24px rgba(0,0,0,.35))",
  }}
/>
</div>
<div
  style={{
    background: "#1F2937",
    border: "1px solid #374151",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  }}
>
  <Image
   src={imagenBrasas[categoria] ?? "/images/brasas/brasas-oficial.webp"}
    alt="Brasas"
    width={70}
    height={70}
    style={{
      objectFit: "contain",
    }}
  />

  <div>
    <p
      style={{
        color: "#F59E0B",
        fontWeight: "bold",
        margin: 0,
        marginBottom: "6px",
      }}
    >
      💬 Consejo de Brasas
    </p>

    <p
      style={{
        color: "#E5E7EB",
        margin: 0,
        lineHeight: 1.5,
      }}
    >
      {mensajeBrasas}
    </p>
  </div>
</div>
      {/* Buscador */}
      <input
        type="text"
        placeholder="🔍 Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #374151",
          marginBottom: "20px",
          fontSize: "16px",
          backgroundColor: "#1F2937",
          color: "white",
          outline: "none",
        }}
      />

      {/* Categorías */}
      <div
        style={{
          display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
gap: "15px",
          marginBottom: "25px",
        }}
      >
        {
        [
          "Hamburguesas",
          "Alitas",
          "Boneless",
          "Complementos",
          "Costillas",
          "Crepas",
          "Frappés",
          "Malteadas",
          "Bebidas",
          "Combos",
          "Helados",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            style={{
             background:
  categoria === cat
    ? "linear-gradient(135deg, #F59E0B, #D97706)"
    : "#1F2937",
color: categoria === cat ? "#111827" : "white",
border:
  categoria === cat
    ? "2px solid #FCD34D"
    : "1px solid #374151",
borderRadius: "18px",
padding: "18px 10px",
minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
cursor: "pointer",
fontWeight: "bold",
fontSize: "16px",
transition: "all .2s ease",
boxShadow:
  categoria === cat
    ? "0 8px 18px rgba(245,158,11,.35)"
    : "0 4px 10px rgba(0,0,0,.2)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>
  {cat === "Hamburguesas" && "🍔"}
  {cat === "Alitas" && "🍗"}
  {cat === "Boneless" && "🍗"}
  {cat === "Complementos" && "🍟"}
  {cat === "Crepas" && "🥞"}
  {cat === "Frappés" && "🧋"}
  {cat === "Malteadas" && "🥛"}
  {cat === "Bebidas" && "🥤"}
  {cat === "Combos" && "🍔🍟"}
  {cat === "Costillas" && "🍖"}
{cat === "Helados" && "🍨"}
</div>

<div
  style={{
    fontSize: "14px",
    textAlign: "center",
  }}
>
  {cat}
</div>
          </button>
        ))}
      </div>
{/* Promoción de la semana */}

<div
  style={{
    background: "linear-gradient(135deg, #DC2626, #B91C1C)",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "30px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  }}
>
  <div>
    <p
      style={{
        margin: 0,
        fontWeight: "bold",
        fontSize: "14px",
        opacity: 0.9,
      }}
    >
      🔥 PROMOCIÓN DE LA SEMANA
    </p>

    <h2
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "30px",
      }}
    >
      2 ordenes de Alitas por $150
    </h2>

    <p
      style={{
        margin: 0,
        color: "#FDE68A",
      }}
    >
      ¡Solo por tiempo limitado!
    </p>
  </div>
<Image
  src="/images/brasas/brasas-promocion.webp"
  alt="Brasas promoción"
  width={170}
  height={170}
  style={{
    objectFit: "contain",
  }}
/>
  <button
    onClick={() => setCategoria("Boneless")}
    style={{
      background: "#F59E0B",
      color: "#111",
      border: "none",
      borderRadius: "12px",
      padding: "14px 24px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Ver promoción
  </button>
</div>
{/* Lo más pedido */}

<div style={{ marginBottom: "30px" }}>
  <h2
    style={{
      color: "#F59E0B",
      marginBottom: "15px",
      fontSize: "28px",
    }}
  >
    ⭐ Lo más pedido
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
    }}
  >
    {productos
      .filter((p) =>
        ["BBQ Bacon", "Boneless BBQ", "Papas Gajo"].includes(p.nombre)
      )
      .map((p) => (
        <div
          key={p.id}
          onClick={() => setCategoria(p.categoria)}
          style={{
            cursor: "pointer",
            background: "#1F2937",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid #374151",
          }}
        >
          <img
            src={p.imagen}
            alt={p.nombre}
            style={{
              width: "100%",
              height: "120px",
              objectFit: "cover",
            }}
          />

          <div style={{ padding: "12px" }}>
            <strong
              style={{
                color: "#F59E0B",
              }}
            >
              {p.nombre}
            </strong>

            <p
              style={{
                color: "#D1D5DB",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              💲{p.precio}
            </p>
          </div>
        </div>
      ))}
  </div>
</div>
      {/* Productos */}
      <div
        style={{
          display: "grid",
         gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
        }}
      >
        {productosFiltrados.map((producto) => (
          <ProductoCard
  key={producto.id}
  producto={producto}
  agregarAlCarrito={agregarAlCarrito}
/>
        ))}
      </div>
    {mostrarCarrito && (
  <Carrito
  carrito={carrito}
  aumentarCantidad={aumentarCantidad}
  disminuirCantidad={disminuirCantidad}
  eliminarProducto={eliminarProducto}
  vaciarCarrito={vaciarCarrito}
  realizarPedido={realizarPedido}
/>
)}
<footer
  style={{
    marginTop: "60px",
    padding: "30px 20px",
    borderTop: "1px solid #374151",
    textAlign: "center",
    color: "#D1D5DB",
  }}
>
  <Image
    src="/images/brasas/brasas-oficial.webp"
    alt="Brasas"
    width={90}
    height={90}
    style={{
      margin: "0 auto 15px",
      objectFit: "contain",
    }}
  />

  <h3
    style={{
      color: "#F59E0B",
      marginBottom: "10px",
    }}
  >
    BLACK GRILL
  </h3>

  <p>🔥 El sabor que enciende tus sentidos.</p>

  <p>📍  ocoyoacac,México</p>

  <p>📞 WhatsApp: 7291013458</p>

  <p
    style={{
      color: "#9CA3AF",
      marginTop: "20px",
      fontSize: "14px",
    }}
  >
    © 2025 Black Grill. Todos los derechos reservados.
  </p>
</footer>
    </main>
  );
}