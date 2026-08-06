"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Gracias() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#1F2937",
          border: "2px solid #F59E0B",
          borderRadius: "20px",
          padding: "30px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Image
  src="/images/brasas/brasas-celebrando.webp"
  alt="Brasas celebrando"
  width={220}
  height={220}
  style={{
    margin: "0 auto 20px",
    objectFit: "contain",
  }}
/>

        <h1
          style={{
            color: "#F59E0B",
            marginBottom: "15px",
          }}
        >
          🎉 ¡Gracias por tu pedido!
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#E5E7EB",
          }}
        >
          ¡Gracias por confiar en <strong>Black Grill</strong>! 🔥
<br />
Soy <strong>Brasas</strong> y ya recibimos tu pedido.
<br />
Nuestro equipo comenzará a prepararlo con todo el sabor que nos caracteriza.
        </p>

        <button
          onClick={() => router.push("/menu")}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#F59E0B",
            color: "black",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🍔 Volver al menú
        </button>
      </div>
    </main>
  );
}