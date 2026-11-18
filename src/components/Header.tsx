"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Zap,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Bell,
  Search,
} from "lucide-react";
import InteractiveSandboxModal from "./InteractiveSandboxModal";

interface HeaderProps {
  onRefreshData?: () => void;
}

const pageTitles: Record<string, { title: string; module: string; desc: string }> = {
  "/dashboard": {
    title: "Executive Overview & Human Risk Command Center",
    module: "Executive Suite",
    desc: "Organization-wide human vulnerability metrics, risk reduction trends, and live telemetry.",
  },
  "/campaigns": {
    title: "Simulation Campaign Engine",
    module: "Module 1 • Member 1",
    desc: "Attack vector templates, tokenized simulation dispatch, and interactive testing.",
  },
  "/countermeasures": {
    title: "Countermeasures & A/B Effectiveness Lab",
    module: "Module 2 • Member 2",
    desc: "Defensive controls, A/B cohort risk reduction statistics, and interactive micro-training.",
  },
  "/culture": {
    title: "Security Culture Assessment Portal",
    module: "Module 3 • Member 3",
    desc: "5-Dimensional psychometric diagnostics, radar analytics, and live assessment test.",
  },
  "/departments": {
    title: "Department & Employee Risk Matrix",
    module: "Module 3 • Member 3",
    desc: "Composite Human Risk Score (HRS) formula breakdowns and psychological vulnerability mapping.",
  },
  "/reports": {
    title: "Ethical Guardrails & Compliance Audit",
    module: "Audit & Governance",
    desc: "NIST CSF / ISO 27001 awareness reporting, zero-credential storage proof, and CSV export.",
  },
};

export default function Header({ onRefreshData }: HeaderProps) {
  const pathname = usePathname();
  const pageMeta = pageTitles[pathname] || {
    title: "Security Management Console",
    module: "Platform",
    desc: "Social Engineering Countermeasures & Culture Assessment Platform",
  };

  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  // Load campaigns for the sandbox
  React.useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCampaigns(data.campaigns);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleResetData = async () => {
    if (!confirm("Reset database to initial enterprise state? This will repopulate fresh simulation data.")) {
      return;
    }
    setIsResetting(true);
    try {
      const res = await fetch("/api/reset-data", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert("Database successfully re-seeded with pristine enterprise data!");
        if (onRefreshData) onRefreshData();
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to reset database.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title and Module Information */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {pageMeta.title}
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              {pageMeta.module}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {pageMeta.desc}
          </p>
        </div>

        {/* Action Controls & Guardrail Badges */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          {/* Zero-Credential Storage Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Credential Policy Active</span>
          </div>

          {/* Quick Demo Sandbox Button */}
          <button
            onClick={() => setIsSandboxOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Live Attack Sandbox</span>
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={handleResetData}
            disabled={isResetting}
            title="Reset database to initial baseline data"
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-slate-500 ${isResetting ? "animate-spin" : ""}`} />
            <span>Reset Baseline</span>
          </button>
        </div>
      </header>

      {/* Split-Screen Interactive Sandbox Modal */}
      <InteractiveSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        campaigns={campaigns}
        onEventLogged={() => {
          if (onRefreshData) onRefreshData();
        }}
      />
    </>
  );
}
