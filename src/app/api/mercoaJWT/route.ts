import { createSupabaseServerClient } from "@/supabase/server";
import { MercoaClient } from "@mercoa/javascript";
import { NextRequest, NextResponse } from "next/server";

const mercoa = new MercoaClient({
  token: process.env.MERCOA_API_KEY!,
});

export async function GET(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Authenticate the user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const auth_user_id = userData.user.id;

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

    // Get the business
    const { data, error } = await supabase
      .from("businesses")
      .select("mercoa_entity_id, mercoa_user_id")
      .eq("id", business_id)
      .single();

    console.log("Business data:", data);
    if (error || !data) {
      return NextResponse.json({ error: "Failed to update business" }, { status: 500 });
    }

    // Get JWT
    const mercoaEntityId = data.mercoa_entity_id;
    const mercoaUserId = data.mercoa_user_id;
    console.log("Mercoa Entity ID:", mercoaEntityId);
    console.log("Mercoa User ID:", mercoaUserId);
    const jwt = await mercoa.entity.user.getToken(mercoaEntityId, mercoaUserId, { expiresIn: "1h" });
    console.log("JWT:", jwt);

    return NextResponse.json({ success: true, jwt });
  } catch (error) {
    console.error("Error in GET /api/mercoaJWT:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
