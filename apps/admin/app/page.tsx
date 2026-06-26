import Link from 'next/link';
import { getConsumerProductUrl } from "@/lib/consumer";
import { DemoScenario } from "@/lib/demoScenario";
import { AuditTester } from "@/components/AuditTester";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-canvas text-brand-deep-charcoal flex flex-col font-sans">
      <div className="bg-functional-pending/10 border-b border-functional-pending px-4 py-3 flex items-center justify-center gap-2 text-sm text-brand-deep-charcoal font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-functional-pending">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span><strong>Demo Mode:</strong> Portfolio demo — seeded supply-chain verification scenario</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Eco Trace Admin Workstation</h1>
          <p className="text-lg md:text-xl text-functional-neutral max-w-2xl mx-auto leading-relaxed">
            React 19 auditor surface for governing cryptographically verified supply-chain claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
          <div className="bg-surface-card border border-surface-border p-8 rounded-xl shadow-subtle flex flex-col items-center text-center hover:shadow-elevation-1 transition-shadow">
            <div className="w-12 h-12 rounded-full bg-brand-integrity-green/20 flex items-center justify-center text-brand-verification-green font-bold text-xl mb-6">1</div>
            <h3 className="font-bold text-lg mb-3">Audit the claim</h3>
            <p className="text-functional-neutral text-sm mb-8 flex-1 leading-relaxed">
              Log in to the auditor workstation to review the cryptographically verified events, trace the supply chain, and view integrity checks.
            </p>
            <Link href="/dashboard/overview" className="bg-brand-deep-charcoal text-surface-card px-6 py-3 rounded-md font-medium hover:bg-brand-deep-charcoal/90 transition-colors w-full">
              Enter Auditor Workstation
            </Link>
          </div>

          <div className="bg-surface-card border border-surface-border p-8 rounded-xl shadow-subtle flex flex-col items-center text-center hover:shadow-elevation-1 transition-shadow">
            <div className="w-12 h-12 rounded-full bg-brand-integrity-green/20 flex items-center justify-center text-brand-verification-green font-bold text-xl mb-6">2</div>
            <h3 className="font-bold text-lg mb-3">Verify the product</h3>
            <p className="text-functional-neutral text-sm mb-8 flex-1 leading-relaxed">
              Experience the public verification surface. This is what end-consumers see when they scan a product QR code to verify its authenticity.
            </p>
            <a href={getConsumerProductUrl(DemoScenario.assetId)} target="_blank" rel="noopener noreferrer" className="bg-surface-canvas border border-surface-border text-brand-deep-charcoal px-6 py-3 rounded-md font-medium hover:bg-surface-border/50 transition-colors w-full">
              Open Consumer App ↗
            </a>
          </div>

          <div className="bg-surface-card border border-surface-border p-8 rounded-xl shadow-subtle flex flex-col items-center text-center hover:shadow-elevation-1 transition-shadow">
            <div className="w-12 h-12 rounded-full bg-brand-integrity-green/20 flex items-center justify-center text-brand-verification-green font-bold text-xl mb-6">3</div>
            <h3 className="font-bold text-lg mb-3">Inspect the architecture</h3>
            <p className="text-functional-neutral text-sm mb-8 flex-1 leading-relaxed">
              Read the case study detailing how the shared Go/Wasm trust engine ensures edge verification across both React and Vue deployments.
            </p>
            <a href="https://github.com/hguerra/eco-trace/blob/main/docs/case-study.md" target="_blank" rel="noopener noreferrer" className="bg-surface-canvas border border-surface-border text-brand-deep-charcoal px-6 py-3 rounded-md font-medium hover:bg-surface-border/50 transition-colors w-full">
              Read Case Study ↗ <span className="block text-xs font-normal text-functional-neutral mt-1">(Pending Execution Order 9)</span>
            </a>
          </div>
        </div>

        <div className="w-full bg-brand-deep-charcoal text-surface-canvas rounded-xl p-8 shadow-elevation-1 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 overflow-x-auto pb-4 md:pb-0">
            <div className="bg-surface-card/10 px-6 py-4 rounded-lg text-center w-full md:w-auto flex-1 min-w-[140px]">
              <span className="block text-brand-integrity-green font-bold text-xs uppercase tracking-wider mb-2">Auditor Surface</span>
              <span className="font-medium">React Admin</span>
            </div>
            <div className="hidden md:block text-brand-integrity-green opacity-50">→</div>
            <div className="bg-surface-card/10 px-6 py-4 rounded-lg text-center w-full md:w-auto flex-1 min-w-[140px]">
              <span className="block text-brand-integrity-green font-bold text-xs uppercase tracking-wider mb-2">Trust Engine</span>
              <span className="font-medium">Go / Wasm</span>
            </div>
            <div className="hidden md:block text-brand-integrity-green opacity-50">→</div>
            <div className="bg-surface-card/10 px-6 py-4 rounded-lg text-center w-full md:w-auto flex-1 min-w-[140px]">
              <span className="block text-brand-integrity-green font-bold text-xs uppercase tracking-wider mb-2">Edge State</span>
              <span className="font-medium">Cloudflare D1</span>
            </div>
            <div className="hidden md:block text-brand-integrity-green opacity-50">→</div>
             <div className="bg-surface-card/10 px-6 py-4 rounded-lg text-center w-full md:w-auto flex-1 min-w-[140px]">
              <span className="block text-brand-integrity-green font-bold text-xs uppercase tracking-wider mb-2">Public Verification</span>
              <span className="font-medium">Vue Consumer</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-1.5 bg-brand-integrity-green/10 text-brand-integrity-green border border-brand-integrity-green/30 rounded-full text-sm font-medium">React 19</span>
            <span className="px-4 py-1.5 bg-brand-integrity-green/10 text-brand-integrity-green border border-brand-integrity-green/30 rounded-full text-sm font-medium">Server Components</span>
            <span className="px-4 py-1.5 bg-brand-integrity-green/10 text-brand-integrity-green border border-brand-integrity-green/30 rounded-full text-sm font-medium">Cloudflare D1</span>
            <span className="px-4 py-1.5 bg-brand-integrity-green/10 text-brand-integrity-green border border-brand-integrity-green/30 rounded-full text-sm font-medium">Go/Wasm</span>
            <span className="px-4 py-1.5 bg-brand-integrity-green/10 text-brand-integrity-green border border-brand-integrity-green/30 rounded-full text-sm font-medium">Ed25519</span>
          </div>
          
          <div className="max-w-3xl mx-auto text-center text-sm opacity-90 leading-relaxed border-t border-surface-card/10 pt-8">
            <strong className="block mb-2 text-brand-integrity-green">Why are Admin and Consumer separate apps?</strong> 
            The Admin app is a governed, authenticated Next.js environment designed for enterprise auditors to review supply-chain anomalies. The Consumer app is a lightweight, edge-deployed Vue application built for instantaneous public verification. By separating them, we ensure the public surface remains fast and immutable while the auditor surface retains rich analytical capabilities, both sharing the exact same cryptographic trust engine via WebAssembly.
          </div>
        </div>
        
        <div className="w-full max-w-2xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
          <div className="border border-surface-border rounded-xl p-6 bg-surface-canvas">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-verification-green"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-functional-neutral">Trust Engine Diagnostics</h3>
            </div>
            <div className="text-sm">
              <AuditTester />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
