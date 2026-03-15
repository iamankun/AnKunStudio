import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Update user role to admin in profiles table
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: 'admin' })
      .eq("email", email)
      .select()
      .single();

    if (error) {
      console.error("Error setting admin role:", error);
      return NextResponse.json({ error: "Failed to set admin role" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Admin role set successfully",
      user: data 
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET method to check if user is admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", email)
      .single();

    if (error) {
      return NextResponse.json({ isAdmin: false, error: "User not found" });
    }

    return NextResponse.json({ 
      isAdmin: data?.role === 'admin',
      role: data?.role 
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
