import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/supabase/server";

export async function GET(request: Request) {
  // Initialize the Supabase client on the server
  const supabase = await createSupabaseServerClient();

  // Use getUser() to authenticate the user data via the Supabase Auth server
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const auth_user_id = userData.user.id;

  console.log("Authenticated User ID:", auth_user_id);

  // Query the user_business table to get the business_id for the authenticated user
  const { data: userBusiness, error: userBusinessError } = await supabase
    .from("user_business")
    .select("business_id")
    .eq("auth_user_id", auth_user_id)
    .single();

  console.log("User Business Data:", userBusiness);

  if (userBusinessError || !userBusiness) {
    return NextResponse.json({ error: "Business not found in user_business" }, { status: 404 });
  }

  const business_id = userBusiness.business_id;

  console.log("Business ID:", business_id);

  // Query the businesses table to get the full business record using the business_id
  const { data: businessData, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", business_id)
    .single();

  console.log("Business Data:", businessData);

  if (businessError || !businessData) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json({ business: businessData });
}
