import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-canvas text-brand-deep-charcoal w-full">
      <div className="w-full max-w-md p-8 bg-surface-card rounded-lg shadow-elevation-1 border border-surface-border">
        <h1 className="text-xl font-bold mb-2">Auditor Login</h1>
        <p className="text-functional-neutral mb-4 text-sm">
          Sign in with your Ed25519-associated account.
        </p>
        <div className="mb-6 p-4 bg-surface-canvas border border-brand-integrity-green/30 rounded-md text-sm text-brand-deep-charcoal">
          <strong>Demo Context:</strong> This workstation uses role-based access control to simulate an enterprise auditor surface.
          <div className="mt-2 text-xs text-functional-neutral">
            Demo credentials: <code className="bg-surface-card px-1 py-0.5 rounded">auditor</code> / <code className="bg-surface-card px-1 py-0.5 rounded">demo2026</code>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
