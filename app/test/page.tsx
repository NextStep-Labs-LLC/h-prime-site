export const dynamic = 'force-dynamic';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>✅ Test Page Works!</h1>
      <p>Time: {new Date().toISOString()}</p>
      <p>If you see this, Next.js is working correctly.</p>
      <a href="/">Back to Home</a>
    </div>
  );
}



