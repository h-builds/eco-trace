import { logoutAction } from "../lib/auth-actions";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-surface-canvas text-brand-deep-charcoal w-full">
      <header className="flex items-center justify-between p-4 bg-surface-card border-b border-surface-border shadow-subtle w-full">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Eco-Trace Admin</h2>
          <span className="text-xs bg-brand-integrity-green text-brand-deep-charcoal px-2 py-1 rounded-pill font-medium">
            {session.role}
          </span>
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
      <main className="p-6 w-full">
        {children}
      </main>
    </div>
  );
}
