// /app/api/createMercoaC2/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MercoaClient } from "@mercoa/javascript";
import { createSupabaseServerClient } from "@/supabase/server";

const mercoa = new MercoaClient({
  token: process.env.MERCOA_API_KEY!,
});

export async function POST(req: NextRequest) {
  // Authenticate the user
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const auth_user_id = userData.user.id;

  try {
    // Fetch entity info
    const { legalName, email } = await req.json();
    if (!legalName || !email) {
      return NextResponse.json({ error: "Legal business name and email are required" }, { status: 400 });
    }
    // return NextResponse.json({ success: true });

    // Create entity
    const entity = await mercoa.entity.create({
      isCustomer: true,
      isPayor: true,
      isPayee: false,
      accountType: "business",
      profile: {
        business: {
          email: email,
          legalBusinessName: legalName,
        },
      },
    });
    console.log("Mercoa Entity Created:", entity);

    // Create sole user (for demo purposes) - could be fixed later to allow multiple users
    const user = await mercoa.entity.user.create(entity.id, {
      foreignId: "MY-DB-ID-12345",
      email: userData.user.email,
      name: "Business Owner",
      roles: ["admin", "approver"],
    });

    console.log("Mercoa User Created:", user);

    // Get the user business
    const { data: userBusiness, error: userBusinessError } = await supabase
      .from("user_business")
      .select("business_id")
      .eq("auth_user_id", auth_user_id)
      .single();

    if (userBusinessError || !userBusiness) {
      return NextResponse.json({ error: "Business mapping not found" }, { status: 404 });
    }

    const business_id = userBusiness.business_id;
    console.log("Business ID:", business_id);
    // Update the business
    const { data, error } = await supabase
      .from("businesses")
      .update({
        is_on_boarded: true,
        mercoa_entity_id: entity.id,
        mercoa_user_id: user.id,
        // Not sure if I should actulaly store the KYB yet
      })
      .eq("id", business_id)
      .select("*")
      .single();

    console.log("Business data:", data);
    console.log("Business error:", error);
    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ business: data });

    return NextResponse.json({ success: true, entity });
  } catch (err: any) {
    console.error("Mercoa Entity Creation Failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
