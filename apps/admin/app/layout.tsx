import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco-Trace Admin",
  description: "ESG Audit & Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
