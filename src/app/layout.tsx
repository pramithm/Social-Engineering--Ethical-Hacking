import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "HumanRisk SEC | Social Engineering & Security Culture Platform",
  description:
    "Ethical Hacking Capstone Platform for Social Engineering Countermeasures Effectiveness Measurement and Security Culture Assessment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex antialiased">
        {/* Left Persistent Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header />
          <main className="flex-1 p-8 bg-slate-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
