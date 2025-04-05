import { createSupabaseServerClient } from "@/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = await createSupabaseServerClient(req, res);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard/home", req.url));
  }

  return res;
}
