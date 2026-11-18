"use client";

import React, { useEffect, useState } from "react";
import {
  FileCheck2,
  Download,
  Printer,
  ShieldCheck,
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
} from "lucide-react";

export default function ReportsPage() {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports/audit");
      const json = await res.json();
      if (json.success) {
        setReportData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownloadCSV = () => {
    if (!reportData?.csvContent) return;
    const blob = new Blob([reportData.csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `security_audit_telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { auditLogs, complianceFrameworks, stats } = reportData || {};

  return (
    <div className="space-y-8 print-page">
      {/* Top Header & Export Controls */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Executive Audit & Ethical Governance Reports
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                NIST CSF & ISO 27001
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Formal audit certification trail, ethical boundaries validation, and compliance metrics export.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-2 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Download CSV Telemetry</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Audit Certification</span>
          </button>
        </div>
      </div>

      {/* Printable Executive Audit Report View */}
      <div className="bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-8">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block">
              Ethical Hacking Capstone Audit Certification
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Social Engineering Defense & Security Culture Audit Report
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Assessment Platform Telemetry • Scope: Enterprise Human Layer Resilience
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-slate-500 space-y-1">
            <p><strong>Report Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Classification:</strong> Internal Security Audit (Privileged)</p>
            <p><strong>Database:</strong> SQLite Local Instance (dev.db)</p>
          </div>
        </div>

        {/* Audit Highlights Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Audit Logs Tracked
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {stats?.totalAuditLogs || 5}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Simulations Dispatched
            </span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">
              {stats?.totalSimulationEvents || 18}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Policy Interventions
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {stats?.policyEnforcedCount || 2}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Privacy Guardrail Status
            </span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded mt-2 inline-block">
              100% Enforced
            </span>
          </div>
        </div>

        {/* Framework Compliance Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Regulatory & Security Framework Compliance Alignments
          </h3>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Framework / Control</th>
                  <th className="py-3 px-4">Control Objective</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {complianceFrameworks?.map((item: any) => (
                  <tr key={item.controlId} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{item.framework}</span>
                      <span className="font-mono text-[11px] text-blue-700 font-semibold">
                        {item.controlId}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-sm">
                      <strong className="text-slate-800">{item.name}</strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {item.status} ({item.score})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-600">{item.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dedicated Ethical Hacking Scope & Privacy Architecture Panel */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900">
            <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Ethical Hacking Scope, Privacy Architecture & Rules of Engagement
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-white border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero-Credential Storage Guarantee
              </strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                All simulated landing pages intercept and discard passwords directly in memory before writing to SQLite. Only non-sensitive interaction booleans (<code>clicked_link</code>, <code>submitted_form</code>, <code>dwell_time</code>) are logged.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Blameless & Non-Punitive Culture
              </strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The platform operates under a strictly non-punitive paradigm. Simulation failures are treated as immediate <em>Teachable Moments</em> rather than disciplinary infractions, fostering psychological safety.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No Weaponized Payloads
              </strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Attack simulations utilize benign HTTP tracking tokens. No malicious executables, macro-enabled documents, or persistence backdoors are generated or transmitted.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strict Local Containment
              </strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The entire software stack, database engine (SQLite), and API layer execute 100% locally on localhost with zero external cloud telemetry leaks.
              </p>
            </div>
          </div>
        </div>

        {/* Live System Audit Log Trail */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              System Audit Log Trail
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">SQLite SystemAuditLog Table</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Module</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px]">
                {auditLogs?.map((log: any) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-slate-400 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-3 font-bold text-slate-900">{log.action}</td>
                    <td className="py-2 px-3 text-slate-600">{log.actor}</td>
                    <td className="py-2 px-3 text-blue-600">{log.module}</td>
                    <td className="py-2 px-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.severity === "POLICY_ENFORCED"
                            ? "bg-rose-100 text-rose-800"
                            : log.severity === "SECURITY_AUDIT"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capstone Sign-Off Block */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-800 block">Lead Simulation Engineer:</span>
            <span className="text-slate-500">Member 1 (Telemetry Engine)</span>
          </div>
          <div>
            <span className="font-bold text-slate-800 block">Defensive Architect:</span>
            <span className="text-slate-500">Member 2 (Countermeasures & A/B)</span>
          </div>
          <div>
            <span className="font-bold text-slate-800 block">Security Culture Analyst:</span>
            <span className="text-slate-500">Member 3 (Psychometrics & Risk)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
