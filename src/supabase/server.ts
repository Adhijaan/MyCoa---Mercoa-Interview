// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export async function createSupabaseServerClient(req?: NextRequest, res?: NextResponse) {
  // If called from middleware with req/res, use that cookie handling
  if (req && res) {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (newCookies) => {
          newCookies.forEach(({ name, value, options }) => {
            res.cookies.set({ name, value, ...options });
          });
        },
      },
    });
  }

  // Else default to next/headers (for server components)
  const cookieStore = await nextCookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (newCookies) => {
        newCookies.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
