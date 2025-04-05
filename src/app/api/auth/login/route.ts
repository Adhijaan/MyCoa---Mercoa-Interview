import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const supabase = await createSupabaseServerClient();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
