import { AuditTester } from "@/components/AuditTester";
import { getConsumerProductUrl } from "@/lib/consumer";
import { DemoScenario } from "@/lib/demoScenario";

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Eco-Trace Admin Dashboard</h1>
      <div style={{ marginBottom: '2rem' }}>
        <a 
          href={getConsumerProductUrl(DemoScenario.assetId)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '8px 16px', backgroundColor: '#111827', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
        >
          Open Consumer Verification App ↗
        </a>
      </div>
      <AuditTester />
    </main>
  );
}
