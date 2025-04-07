import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/supabase/server";

// GET: Fetch business entity information
export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();

  // Authenticate the user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const auth_user_id = userData.user.id;

  // Get User's business
  const { data: userBusiness, error: userBusinessError } = await supabase
    .from("user_business")
    .select("business_id")
    .eq("auth_user_id", auth_user_id)
    .single();

  if (userBusinessError || !userBusiness) {
    return NextResponse.json({ error: "Business mapping not found" }, { status: 404 });
  }

  const business_id = userBusiness.business_id;

  // Get business entity information
  const { data: businessData, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", business_id)
    .single();

  if (businessError || !businessData) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json({ business: businessData });
}

// // PUT: Update business onboarding info
// export async function PUT(request: Request) {
//   try {
//     const supabase = await createSupabaseServerClient();

//     // Authenticate the user
//     const { data: userData, error: userError } = await supabase.auth.getUser();
//     if (userError || !userData.user) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }
//     const auth_user_id = userData.user.id;

//     // Parse the JSON payload
//     const body = await request.json();

//     // Get the user business
//     const { data: userBusiness, error: userBusinessError } = await supabase
//       .from("user_business")
//       .select("business_id")
//       .eq("auth_user_id", auth_user_id)
//       .single();

//     if (userBusinessError || !userBusiness) {
//       return NextResponse.json({ error: "Business mapping not found" }, { status: 404 });
//     }

//     const business_id = userBusiness.business_id;
//     console.log("Business ID:", business_id);
//     // Update the business
//     const { data, error } = await supabase
//       .from("businesses")
//       .update({
//         is_on_boarded: body.is_on_boarded,
//         // Not sure if I should actulaly store the KYB yet
//       })
//       .eq("id", business_id)
//       .select("*")
//       .single();

//     console.log("Business data:", data);
//     console.log("Business error:", error);
//     if (error || !data) {
//       return NextResponse.json({ error: error?.message || "Update failed" }, { status: 500 });
//     }

//     return NextResponse.json({ business: data });
//   } catch (err) {
//     console.error("Error in PUT /api/EntityInfo:", err);
//     return NextResponse.json({ error: "Internal error marking onboarding complete" }, { status: 500 });
//   }
// }
