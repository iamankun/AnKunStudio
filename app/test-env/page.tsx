// Test environment variables in Next.js
export default function TestEnv() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variables Test</h1>
      <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
      <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
      <div>NODE_ENV: {process.env.NODE_ENV || '❌ Missing'}</div>
      <div>URL Preview: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 50)}...</div>
    </div>
  );
}
