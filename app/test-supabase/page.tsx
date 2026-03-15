// Test Supabase connection directly
export default async function TestSupabase() {
  let supabaseData = null;
  let error = null;

  try {
    // Test direct fetch to Supabase
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
    
    supabaseData = {
      status: response.status,
      statusText: response.statusText,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL
    };
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Environment Variables:</strong>
        <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</div>
        <div>NODE_ENV: {process.env.NODE_ENV}</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>Direct Fetch Test:</strong>
        {error ? (
          <div style={{ color: 'red' }}>
            ❌ Error: {error}
          </div>
        ) : (
          <div style={{ color: 'green' }}>
            ✅ Status: {supabaseData?.status} - {supabaseData?.statusText}
          </div>
        )}
      </div>

      <div>
        <strong>Next Steps:</strong>
        <ul>
          <li>If error: Check CORS settings in Supabase Dashboard</li>
          <li>Add http://localhost:3000 to CORS allowed origins</li>
          <li>Restart dev server after changing .env.local</li>
        </ul>
      </div>
    </div>
  );
}
