import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("pedidos")
      .insert({
        numero_pedido: body.numero_pedido,
        cliente: body.cliente,
        tipo_pedido: body.tipo_pedido,
        mesa: body.mesa,
        direccion: body.direccion,
        referencias: body.referencias,
        metodo_pago: body.metodo_pago,
        productos: body.productos,
        total: body.total,
        estado: "nuevo",
        origen: "web",
      })
      .select()
      .single();

    if (error) {
      console.error("Error Supabase:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      pedido: data,
    });
  } catch (error: any) {
    console.error("Error API:", error);

    return NextResponse.json(
      {
        error: error?.message || "Error desconocido",
      },
      {
        status: 500,
      }
    );
  }
}