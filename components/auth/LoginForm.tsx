"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // 🔥 Get redirectTo parameter from URL
  const redirectTo = useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirectTo');
      // Decode URL encoded parameter
      return redirect ? decodeURIComponent(redirect) : '/';
    }
    return '/';
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log('🔐 [ĐĂNG NHẬP] Bắt đầu đăng nhập:', { email: email.substring(0, 10) + '...' });
      console.log('🔑 [ĐĂNG NHẬP] Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Email không hợp lệ. Vui lòng kiểm tra lại.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      console.log('� [ĐĂNG NHẬP] Phản hồi Supabase:', { data, error });

      if (error) {
        console.error('❌ [ĐĂNG NHẬP] Lỗi đăng nhập:', error);

        // Handle specific error types with better messages
        if (error.message?.includes('Invalid login credentials')) {
          // Try to get more specific error info
          try {
            const { data: user } = await supabase.auth.getUser();
            console.log('� [ĐĂNG NHẬP] User sau khi đăng nhập thất bại:', user);

            if (!user) {
              setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            } else {
              setError('Mật khẩu không đúng. Vui lòng kiểm tra lại.');
            }
          } catch (userCheckError) {
            console.error('❌ [ĐĂNG NHẬP] Kiểm tra user thất bại:', userCheckError);
            setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
          }
        } else if (error.message?.includes('Email not confirmed')) {
          setError('Email chưa được xác minh. Vui lòng kiểm tra hộp thư và xác minh email.');
        } else if (error.message?.includes('Too many requests')) {
          setError('Quá nhiều lần thử. Vui lòng đợi 5 phút và thử lại.');
        } else if (error.message?.includes('User already registered')) {
          setError('Tài khoản đã tồn tại. Vui lòng đăng nhập.');
        } else if (error.message?.includes('Failed to fetch') || error.message?.includes('Network')) {
          setError("Không thể kết nối đến server. Vui lòng kiểm tra lại Supabase configuration.");
        } else {
          setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
        throw error;
      }

      console.log('✅ [ĐĂNG NHẬP] Đăng nhập thành công!');
      console.log("🔀 [ĐĂNG NHẬP] Đăng nhập thành công, chuyển hướng đến:", redirectTo);

      // Add small delay to ensure session is set
      setTimeout(() => {
        router.push(redirectTo);
      }, 500);
    } catch (error: unknown) {
      console.error('❌ [ĐĂNG NHẬP] Lỗi đăng nhập không mong muốn:', error);
      const errorMessage = error instanceof Error ? error.message : "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full border border-purple-500/10"
            style={{ 
              left: `${10 + i * 15}%`, 
              top: `${20 + i * 12}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
          whileHover={{ scale: 1.02 }}
        >
          {/* Logo/Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              An Kun Studio
            </h1>
            <p className="text-gray-300 text-sm">
              Phân phối Âm nhạc Kỹ thuật số
            </p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                placeholder="email@example.com"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu
              </label>
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                placeholder="••••••••"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 2 }}
                    >
                      →
                    </motion.div>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-400">Chưa có tài khoản?</span>
              <motion.a
                href="/auth/sign-up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Đăng ký ngay
              </motion.a>
            </div>
            
            <motion.a
              href="/auth/forgot-password"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300"
            >
              Quên mật khẩu?
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
