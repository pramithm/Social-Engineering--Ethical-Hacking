"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Users,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/stats/overview");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error("Fetch overview error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading Executive Security Telemetry...</p>
        </div>
      </div>
    );
  }

  const { kpis, trendData, departmentChartData, recentEvents } = data || {};

  return (
    <div className="space-y-8">
      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Human Risk Score (HRS) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Org Human Risk Score (HRS)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {kpis?.humanRiskScore}
                </span>
                <span className="text-xs font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <div
              className={`p-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center`}
              style={{ backgroundColor: kpis?.riskColor || "#10B981" }}
            >
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Tier: <strong className="text-slate-800">{kpis?.riskTier} Risk</strong></span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> -18.2 pts
            </span>
          </div>
        </div>

        {/* KPI 2: Overall Phishing Failure Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sim Failure Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {kpis?.overallFailureRate}%
                </span>
                <span className="text-xs font-semibold text-slate-400">of targets</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500 text-white">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Benchmark: 27.5%</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> -16.9% post-banners
            </span>
          </div>
        </div>

        {/* KPI 3: Active Reporting Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Phish Reporting Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {kpis?.overallReportRate}%
                </span>
                <span className="text-xs font-semibold text-slate-400">via 1-click</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Industry Avg: 35.0%</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +44.2% YoY
            </span>
          </div>
        </div>

        {/* KPI 4: Mean Time to Report */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Mean Time to Report (MTTR)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {kpis?.meanTimeToReportMinutes}
                </span>
                <span className="text-xs font-semibold text-slate-400">minutes</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-600 text-white">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Pre-Intervention: 42.0m</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" /> 94% faster triage
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: 6-Month Risk Reduction Trend (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                6-Month Risk Reduction & Reporting Velocity Trend
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrates how Failure Rate dropped while Reporting Rate rose after introducing defensive countermeasures.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
              Module 2 Telemetry
            </span>
          </div>

          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="failureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} unit="%" domain={[0, 80]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Area
                  type="monotone"
                  dataKey="failureRate"
                  name="Phishing Failure Rate (%)"
                  stroke="#EF4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#failureGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="reportRate"
                  name="Reporting Rate (%)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#reportGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Vulnerability & Culture Comparison (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Department Risk vs. Culture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of Human Risk Score (HRS) vs Security Culture Score.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              Module 3 Model
            </span>
          </div>

          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="code" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar dataKey="riskScore" name="Human Risk Score (HRS)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cultureScore" name="Culture Score" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Activity Feed & Capstone Modules Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Activity Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Live Simulation Telemetry Feed
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">SQLite Stream</span>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEvents?.map((evt: any) => {
              const isReported = evt.eventType === "REPORTED";
              const isSubmitted = evt.eventType === "SUBMITTED";
              const isClicked = evt.eventType === "CLICKED";

              return (
                <div key={evt.id} className="py-3.5 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase shrink-0 mt-0.5 ${
                        isReported
                          ? "bg-emerald-100 text-emerald-800"
                          : isSubmitted
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {evt.eventType}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {evt.user?.name || "Target User"}{" "}
                        <span className="text-slate-400 font-normal">
                          ({evt.user?.department?.name || "Enterprise"})
                        </span>
                      </p>
                      <p className="text-slate-600 mt-0.5">{evt.details}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap font-mono shrink-0">
                    {evt.timeToInteractSeconds ? `${evt.timeToInteractSeconds}s dwell` : "Immediate"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capstone 3-Member Ownership & Presentation Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Team Capstone Architecture
              </h2>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                3-Member Team
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Designed with strict separation of concerns allowing each team member to independently present and defend their component:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center justify-between">
                  <strong className="text-blue-900 font-bold">Module 1 (Member 1)</strong>
                  <span className="text-[10px] font-mono text-blue-700 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                    /campaigns
                  </span>
                </div>
                <p className="text-blue-800 text-[11px] mt-1">
                  Simulation Engine, Vector Templates, Tokenized Lures, Interactive Sandbox, Real-Time Event Logging.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200/80">
                <div className="flex items-center justify-between">
                  <strong className="text-indigo-900 font-bold">Module 2 (Member 2)</strong>
                  <span className="text-[10px] font-mono text-indigo-700 bg-white px-1.5 py-0.2 rounded border border-indigo-200">
                    /countermeasures
                  </span>
                </div>
                <p className="text-indigo-800 text-[11px] mt-1">
                  Warning Banners, Instant Teachable Moment Overlay, A/B Cohort Efficacy Lab, Gamified Micro-Training.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-900 font-bold">Module 3 (Member 3)</strong>
                  <span className="text-[10px] font-mono text-emerald-700 bg-white px-1.5 py-0.2 rounded border border-emerald-200">
                    /culture & /departments
                  </span>
                </div>
                <p className="text-emerald-800 text-[11px] mt-1">
                  5-Dimensional Psychometric Culture Diagnostics, Human Risk Score (HRS) Formula, NIST/ISO Audit Exports.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Local Database: SQLite (dev.db)</span>
            <span className="text-blue-600 font-semibold">100% Zero-Cloud Dependency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
