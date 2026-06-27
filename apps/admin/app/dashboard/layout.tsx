export const runtime = "edge";

import { logoutAction } from "../lib/auth-actions";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";

import { DemoModeBanner } from "../../components/DemoModeBanner";
import { DashboardNavigation, GuidedDemoStepper } from "../../components/DashboardNavigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login?error=session_expired");
  }

  return (
    <div className="min-h-screen bg-surface-canvas text-brand-deep-charcoal w-full flex flex-col">
      <DemoModeBanner />
      <header className="flex items-center justify-between p-4 bg-surface-card border-b border-surface-border shadow-subtle w-full">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Eco-Trace Admin</h2>
          <span className="text-xs bg-brand-integrity-green text-brand-deep-charcoal px-2 py-1 rounded-pill font-medium">
            {session.role}
          </span>
          <DashboardNavigation />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-functional-neutral">
            {session.username}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-functional-alert hover:underline"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <GuidedDemoStepper />
      <main className="p-6 w-full">
        <div className="mb-6 p-4 bg-surface-card border border-brand-integrity-green/30 rounded-md shadow-subtle flex items-start gap-3">
          <div className="text-brand-integrity-green mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-deep-charcoal">Role-Based Access Control Active</h3>
            <p className="text-xs text-functional-neutral mt-1">
              You are logged in as an <strong>{session.role}</strong>. This restricts which events you can verify and which entities you can manage. In a production environment, your actions are cryptographically signed by your Ed25519 key.
            </p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
