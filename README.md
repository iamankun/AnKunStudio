# An Kun Studio Digital Music Distribution

Một hệ thống xác thực hoàn chỉnh dựa trên Supabase cho Next.js, được trích xuất từ dự án CineVerse. Hệ thống này bao gồm tất cả các thành phần cần thiết để triển khai xác thực người dùng trong ứng dụng web của bạn.

## 📁 Cấu trúc thư mục

├── pages/
auth/
├── components/
│   └── auth/
│       ├── LoginForm.tsx          # Form đăng nhập
│       ├── SignUpForm.tsx         # Form đăng ký
│       └── UserProfileButton.tsx  # Nút profile người dùng
├── utils/
│   └── supabase/
│       ├── client.ts              # Supabase client cho browser
│       ├── server.ts              # Supabase client cho server-side
│       ├── server-session.ts      # Quản lý session server-side
│       └── types.ts               # TypeScript types cho database
├── hooks/
│   └── useSupabaseUser.ts        # Custom hook cho user state
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # Trang đăng nhập
│   │   └── sign-up/
│   │       └── page.tsx          # Trang đăng ký
│   └── api/
│       └── admin/
│           └── auth/
│               ├── login/
│               │   └── route.ts  # API endpoint đăng nhập
│               ├── logout/
│               │   └── route.ts  # API endpoint đăng xuất
│               └── verify/
│                   └── route.ts  # API endpoint xác thực
├── supabase/
│   ├── config.toml               # Cấu hình Supabase local
│   ├── schemas/                  # Database schemas
│   ├── migrations/               # Database migrations
│   ├── templates/                # Email templates
│   ├── seed.sql                  # Seed data
│   └── setup-database.sql        # Setup script
├── middleware.ts                 # Next.js middleware cho auth
├── package.json                  # Dependencies
├── .env.example                  # Environment variables example
└── README.md                     # This file

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Cấu hình environment variables

Copy file `.env.example` thành `.env.local` và điền thông tin:

```bash
cp .env.example .env.local
```

Điền các giá trị sau:

- `NEXT_PUBLIC_SUPABASE_URL`: URL của dự án Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anonymous key từ Supabase

### 3. Cài đặt Supabase CLI

```bash
npm install -g supabase
```

### 4. Khởi động Supabase local development

```bash
npm run sb-start
```

### 5. Chạy ứng dụng

```bash
npm run dev
```

Truy cập `http://localhost:3000` để xem ứng dụng.

## 🔧 Tính năng

### ✨ Xác thực người dùng

- Đăng nhập với email/password
- Đăng ký tài khoản mới
- Quên mật khẩu
- Xác thực email
- OAuth với Google

### 🛡️ Security

- JWT tokens với auto-refresh
- Protected routes
- Server-side session management
- CSRF protection
- Rate limiting

### 📱 Responsive Design

- Mobile-friendly UI
- Modern design với HeroUI components
- Smooth animations với Framer Motion

### 🎨 UI Components

- Login form với background động
- Sign up form với validation
- User profile dropdown
- Loading states
- Error handling

## 📖 Sử dụng

### Basic Usage

```tsx
import { createClient } from './utils/supabase/client';
import useSupabaseUser from './hooks/useSupabaseUser';

function MyComponent() {
  const { data: user, isLoading } = useSupabaseUser();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (user) {
    return <div>Welcome, {user.email}!</div>;
  }
  
  return <div>Please sign in</div>;
}
```

### Server-side Authentication

```tsx
import { createClient } from './utils/supabase/server';
import { redirect } from 'next/navigation';

async function ProtectedPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return <div>Protected content</div>;
}
```

### API Routes

```tsx
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your API logic here
  return NextResponse.json({ success: true });
}
```

## 🔧 Tùy chỉnh

### Database Schema

Schema database được định nghĩa trong `supabase/schemas/`:

- `01_profiles.sql`: User profiles
- `02_watchlist.sql`: User watchlists  
- `03_histories.sql`: User viewing history

### Email Templates

Templates email được đặt trong `supabase/templates/`:

- `confirmation.html`: Email xác thực đăng ký
- `recovery.html`: Email khôi phục mật khẩu

### Middleware

Middleware trong `middleware.ts` xử lý:

- Protected routes
- Auth state checking
- Redirect logic

## 🌐 Deploy

### Vercel

1. Connect repository với Vercel
2. Add environment variables trong Vercel dashboard
3. Deploy

### Supabase Production

1. Tạo dự án mới trên [supabase.com](https://supabase.com)
2. Run migrations:

   ```bash
   supabase db push
   
3. Update environment variables với production URLs

## 📚 Documentation

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Auth Documentation](https://nextjs.org/docs/authentication)
- [HeroUI Components](https://heroui.com/)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🆘 Hỗ trợ

Nếu bạn gặp vấn đề:

1. Kiểm tra environment variables
2. Đảm bảo Supabase đang chạy
3. Xem console logs cho errors
4. Check Supabase dashboard

---

**Lưu ý**: Hệ thống này được trích xuất từ CineVerse và có thể cần tùy chỉnh để phù hợp với dự án của bạn.
