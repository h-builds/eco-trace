import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-canvas text-brand-deep-charcoal w-full">
      <div className="w-full max-w-md p-8 bg-surface-card rounded-lg shadow-elevation-1 border border-surface-border">
        <h1 className="text-xl font-bold mb-2">Auditor Login</h1>
        <p className="text-functional-neutral mb-6 text-sm">
          Sign in with your Ed25519-associated account.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
