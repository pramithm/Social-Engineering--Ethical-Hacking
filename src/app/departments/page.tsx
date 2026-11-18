"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  Users,
  Search,
  Filter,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      const json = await res.json();
      if (json.success) {
        setDepartments(json.departments);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedDeptId(expandedDeptId === id ? null : id);
  };

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.recommendedIntervention.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Department & Employee Human Risk Matrix
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Module 3 • Member 3
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Departmental composite vulnerability calculations and tailored automated countermeasures.
            </p>
          </div>
        </div>

        {/* Formula Display Callout */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-700">
          <span className="text-blue-700 font-bold block mb-0.5">Composite HRS Formula:</span>
          <code>HRS = (0.45 × Failure Rate) + (0.35 × (100 - Culture)) + (0.20 × Dwell Penalty)</code>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search departments or vulnerabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredDepts.length} departments monitored
        </span>
      </div>

      {/* Department Cards List */}
      <div className="space-y-4">
        {filteredDepts.map((dept) => {
          const isExpanded = expandedDeptId === dept.id;
          const { hrsBreakdown } = dept;

          return (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header / Summary Bar */}
              <div
                onClick={() => toggleExpand(dept.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: hrsBreakdown?.riskColor || "#3B82F6" }}
                  >
                    {dept.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: hrsBreakdown?.riskColor || "#3B82F6" }}
                      >
                        {hrsBreakdown?.riskTier} Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                      {dept.description}
                    </p>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Composite HRS
                    </span>
                    <span
                      className="text-2xl font-black"
                      style={{ color: hrsBreakdown?.riskColor || "#EF4444" }}
                    >
                      {hrsBreakdown?.compositeScore}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Culture Score
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      {dept.cultureScore}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Failure Rate
                    </span>
                    <span className="text-lg font-bold text-rose-600">
                      {dept.failureRate}%
                    </span>
                  </div>

                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 bg-slate-100">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Drill-Down Details */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-6">
                  {/* Mathematical Formula Breakdown */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-blue-600" />
                      Composite Score Mathematical Deconstruction:
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px]">
                          1. Failure Rate Component (45% Weight)
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-sm mt-1 block">
                          0.45 × {hrsBreakdown?.simulationFailureRate}% ={" "}
                          <strong className="text-rose-600">
                            {(0.45 * (hrsBreakdown?.simulationFailureRate || 0)).toFixed(1)} pts
                          </strong>
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px]">
                          2. Culture Vulnerability (35% Weight)
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-sm mt-1 block">
                          0.35 × (100 - {dept.cultureScore}) ={" "}
                          <strong className="text-blue-600">
                            {(0.35 * (100 - dept.cultureScore)).toFixed(1)} pts
                          </strong>
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px]">
                          3. Dwell Time Penalty (20% Weight)
                        </span>
                        <span className="font-mono font-bold text-slate-800 text-sm mt-1 block">
                          0.20 × {hrsBreakdown?.dwellTimePenalty} ={" "}
                          <strong className="text-amber-600">
                            {(0.20 * (hrsBreakdown?.dwellTimePenalty || 0)).toFixed(1)} pts
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Psychological Vulnerability Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Psychological Bias Anomaly:
                        </span>
                        <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          Authority Bias: {dept.authorityBiasScore}% | Urgency: {dept.urgencySusceptibility}%
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Employees in {dept.name} show high vulnerability to social engineering vectors that mimic executive directives or create strict artificial deadlines.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/90 text-xs space-y-2">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        Automated Intervention Prescribed:
                      </span>
                      <p className="text-[11px] text-blue-800 leading-relaxed">
                        {dept.recommendedIntervention}
                      </p>
                    </div>
                  </div>

                  {/* Employee Directory for this Department */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Employees Monitored in {dept.name} ({dept.users?.length || 0})
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Individual simulations and report tracking
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                          <tr>
                            <th className="py-2.5 px-3">Employee Name</th>
                            <th className="py-2.5 px-3">Job Role</th>
                            <th className="py-2.5 px-3">Risk Score</th>
                            <th className="py-2.5 px-3">Simulations</th>
                            <th className="py-2.5 px-3">Failures</th>
                            <th className="py-2.5 px-3">Reports</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {dept.users?.map((u: any) => (
                            <tr key={u.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-semibold text-slate-900">
                                {u.name}
                              </td>
                              <td className="py-2.5 px-3 text-slate-500">{u.role}</td>
                              <td className="py-2.5 px-3 font-mono font-bold">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] ${
                                    u.riskScore > 60
                                      ? "bg-rose-100 text-rose-800"
                                      : u.riskScore > 35
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-emerald-100 text-emerald-800"
                                  }`}
                                >
                                  {u.riskScore}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-mono">{u.phishingSimulationsCount}</td>
                              <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">
                                {u.phishingFailuresCount}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-emerald-600 font-semibold">
                                {u.phishingReportsCount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
