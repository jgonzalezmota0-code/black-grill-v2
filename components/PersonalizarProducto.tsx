type Props = {
  abierto: boolean;
  onCerrar: () => void;
};

export default function PersonalizarProducto({
  abierto,
  onCerrar,
}: Props) {
  if (!abierto) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#1E1E1E",
          color: "white",
          padding: "25px",
          borderRadius: "15px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ color: "#F59E0B" }}>
          Personalizar producto
        </h2>

        <p>Aquí aparecerán los extras del producto.</p>

        <button
          onClick={onCerrar}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#F59E0B",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}