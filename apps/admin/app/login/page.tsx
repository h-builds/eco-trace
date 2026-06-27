export const runtime = "edge";

import LoginForm from "./LoginForm";

export default async function LoginPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const isSessionExpired = searchParams?.error === "session_expired";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-canvas text-brand-deep-charcoal w-full">
      <div className="w-full max-w-md p-8 bg-surface-card rounded-lg shadow-elevation-1 border border-surface-border">
        {isSessionExpired && (
          <div className="mb-4 p-3 bg-functional-alert/10 text-functional-alert border border-functional-alert/20 rounded-md text-sm font-medium">
            Your session has expired. Please sign in again.
          </div>
        )}
        <h1 className="text-xl font-bold mb-2">Auditor Login</h1>
        <p className="text-functional-neutral mb-4 text-sm">
          Sign in with your Ed25519-associated account (Ed25519 is a public-key cryptography algorithm for secure digital signatures).
        </p>
        <div className="mb-6 p-4 bg-surface-canvas border border-brand-integrity-green/30 rounded-md text-sm text-brand-deep-charcoal">
          <strong>Demo Context:</strong> This workstation uses role-based access control (RBAC - restricting access based on roles) to simulate an enterprise-inspired auditor surface.
          <div className="mt-2 text-xs text-functional-neutral">
            Demo credentials: <code className="bg-surface-card px-1 py-0.5 rounded">auditor</code> / <code className="bg-surface-card px-1 py-0.5 rounded">demo2026</code>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
