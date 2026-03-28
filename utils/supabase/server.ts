import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "../env"; // Đã import env được Zod xác thực

/**
 * Đặc biệt quan trọng nếu sử dụng Fluid compute: Không đặt client này trong
 * một biến toàn cục. Luôn tạo một client mới bên trong mỗi hàm khi sử dụng nó.
 */
export async function createClient() {
  const cookieStore = await cookies();

  // Sử dụng biến môi trường đã được cấu hình và xác thực qua Zod
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Kiểm tra độ dài khóa ẩn danh (Bảo vệ thêm ngoài Zod)
  if (supabaseAnonKey.length < 100) {
    console.error("🔍 [MÁY CHỦ AN KUN STUDIO] Độ dài khóa ẩn danh Supabase không hợp lệ");
    throw new Error("Khóa ẩn danh Supabase không hợp lệ: quá ngắn");
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Phương thức `setAll` được gọi từ một Server Component.
            // Có thể bỏ qua lỗi này nếu bạn có middleware làm mới phiên người dùng.
          }
        },
      },
    },
  );
}