import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@/lib/portfolio';
import { supabase } from '@/lib/supabase';


const DAILY_LIMIT = 3;

function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Completa todos los campos.' }, { status: 400 });
  }

  if (!supabase || !process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "Puedes enviar tu solicitud por correo directo o WhatsApp." }, { status: 503 });
  }

  // ── Rate limit: max 3 per IP per day ──────────────────────────
  const ip = getIP(request);
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', dayStart.toISOString());

  if (count >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: `Puedes enviar hasta ${DAILY_LIMIT} mensajes al día.` },
      { status: 429 }
    );
  }

  try {
    // Save to Supabase (include ip for rate limiting)
    const { error: dbError } = await supabase.from('inquiries').insert([{ name, email, message, ip }]);
    if (dbError) {
      console.error('Supabase insert error:', dbError);
    }

    // Send email
    const { data, error: emailError } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#fff;padding:32px;border-radius:12px">
          <h2 style="color:#e1251b;margin:0 0 24px">Nuevo mensaje del portafolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#999;width:80px">De</td><td style="padding:8px 0;color:#fff">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#999">Correo</td><td style="padding:8px 0;color:#e1251b"><a href="mailto:${email}" style="color:#e1251b">${email}</a></td></tr>
          </table>
          <hr style="border:1px solid #222;margin:20px 0"/>
          <p style="color:#ccc;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'No se pudo enviar el correo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'No se pudo enviar el correo.' }, { status: 500 });
  }
}
