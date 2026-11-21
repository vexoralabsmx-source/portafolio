import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Escribe un correo electrónico válido." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }])
      .select()
      .single();

    // If error is unique violation (23505), it means they are already subscribed
    if (error && error.code === "23505") {
      return NextResponse.json({ success: true, message: "¡Ya tienes una suscripción!" }, { status: 200 });
    }

    if (error) throw error;

    return NextResponse.json({ success: true, message: "¡Suscripción confirmada!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo completar la suscripción." }, { status: 500 });
  }
}
