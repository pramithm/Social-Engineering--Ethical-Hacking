"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Send,
  ShieldCheck,
  BrainCircuit,
  Building2,
  FileCheck2,
  ShieldAlert,
  Users2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  module?: string;
}

const navItems: NavItem[] = [
  {
    title: "Executive Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Simulation Engine",
    href: "/campaigns",
    icon: Send,
    module: "Module 1",
  },
  {
    title: "Countermeasures Lab",
    href: "/countermeasures",
    icon: ShieldCheck,
    module: "Module 2",
  },
  {
    title: "Culture Assessment",
    href: "/culture",
    icon: BrainCircuit,
    module: "Module 3",
  },
  {
    title: "Department Matrix",
    href: "/departments",
    icon: Building2,
    module: "Module 3",
  },
  {
    title: "Audit & Guardrails",
    href: "/reports",
    icon: FileCheck2,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center space-x-3 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-base leading-tight">
              HumanRisk
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded font-semibold bg-blue-100 text-blue-700">
              SEC
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[170px]">
            Social Eng & Culture Platform
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Platform Navigation
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{item.title}</span>
              </div>

              {item.module && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  }`}
                >
                  {item.module}
                </span>
              )}
            </Link>
          );
        })}

        {/* Capstone Team Architecture Card */}
        <div className="pt-6 px-1">
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-blue-600" />
                Capstone Team
              </span>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                3 Modules
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-1.5 rounded bg-white border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Member 1</span>
                  <p className="text-[10px] text-slate-500">Simulation & Telemetry</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-1 rounded">
                  Mod 1
                </span>
              </div>

              <div className="p-1.5 rounded bg-white border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Member 2</span>
                  <p className="text-[10px] text-slate-500">Countermeasures & A/B</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1 rounded">
                  Mod 2
                </span>
              </div>

              <div className="p-1.5 rounded bg-white border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Member 3</span>
                  <p className="text-[10px] text-slate-500">Culture & Risk Analytics</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                  Mod 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical Guardrail Status Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-[11px]">
            <p className="font-semibold text-slate-800">Ethical Safe Guardrail</p>
            <p className="text-slate-500 text-[10px]">Zero-Password Storage Policy</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
