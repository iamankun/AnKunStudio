import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/supabase/server-session";
import ProfileClient from "./ProfileClient";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  try {
    console.log("🔍 [PROFILES PAGE] Starting...");
    
    const { user, error: sessionError } = await getServerSession();
    
    if (!user || sessionError) {
      console.log("🔍 [PROFILES PAGE] No user found:", sessionError);
      redirect("/auth/login");
    }

    console.log("🔍 [PROFILES PAGE] User authenticated:", { id: user.id, email: user.email });

    // Get profile - cần tạo supabase client cho database operations
    const supabase = await createClient();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("🔍 [PROFILES PAGE] Profile error:", profileError);
      // Create basic profile if not exists
      if (profileError.message?.includes('No rows')) {
        console.log("🔍 [PROFILES PAGE] Creating basic profile...");
        const { error: createError } = await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            username: user.email?.split("@")[0] || "",
            full_name: "",
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (createError) {
          console.error("🔍 [PROFILES PAGE] Failed to create profile:", createError);
          redirect("/auth/login");
        }
        
        // Re-fetch the created profile
        const { data: newProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        return <ProfileClient user={user} profile={newProfile} />;
      }
      
      redirect("/auth/login");
    }

    console.log("🔍 [PROFILES PAGE] Profile found");
    return <ProfileClient user={user} profile={profile} />;
    
  } catch (error: unknown) {
    console.error("🔍 [PROFILES PAGE] Unexpected error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-900 border border-red-700 rounded-lg p-6">
            <h1 className="text-xl font-bold text-white">Lỗi</h1>
            <p className="text-red-200 mt-2">Đã xảy ra lỗi khi tải trang cá nhân.</p>
            <p className="text-red-300 text-sm mt-2">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}
