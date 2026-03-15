import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Get user info
    const { data: user } = await supabase.auth.getUser(userId);
    
    if (!user.user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get profile data
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return NextResponse.json({ 
      user: user.user,
      profile: profile,
      error: error?.message
    });

  } catch (error) {
    console.error("Debug profile error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 });
  }
}
