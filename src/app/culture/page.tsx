"use client";

import React, { useEffect, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  Award,
  Sparkles,
  Layers,
  Send,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function CulturePage() {
  const [cultureData, setCultureData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"RADAR" | "ASSESSMENT">("RADAR");

  // Live Assessment Form State
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [respondentRole, setRespondentRole] = useState("Senior Analyst");
  const [answers, setAnswers] = useState<Record<string, number>>({
    q1: 4,
    q2: 5,
    q3: 4,
    q4: 5,
    q5: 4,
    q6: 5,
    q7: 4,
    q8: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const fetchCulture = async () => {
    try {
      const res = await fetch("/api/culture");
      const json = await res.json();
      if (json.success) {
        setCultureData(json);
        if (json.departments?.length > 0 && !selectedDeptId) {
          setSelectedDeptId(json.departments[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCulture();
  }, []);

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/culture/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentId: selectedDeptId,
          respondentRole,
          answers,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissionResult(data);
        fetchCulture();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { orgOverallCulture, totalAssessmentsCount, radarData, departments, recentAssessments } =
    cultureData || {};

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Security Culture Assessment & Diagnostic Portal
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Module 3 • Member 3
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluates organizational mindset across 5 core dimensions: Attitudes, Behaviors, Cognition, Compliance, and Blameless Reporting.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("RADAR")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "RADAR"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Culture Radar & Dimensions
          </button>
          <button
            onClick={() => setActiveTab("ASSESSMENT")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "ASSESSMENT"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Take Live Assessment (Demo)
          </button>
        </div>
      </div>

      {activeTab === "RADAR" ? (
        <div className="space-y-6">
          {/* Main 5-Dimension Radar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Radar Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">
                    5-Dimensional Security Culture Radar
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/60">
                    Overall Score: {orgOverallCulture} / 100
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Spider plot benchmarking enterprise scores against industry resilient standards.
                </p>
              </div>

              <div className="h-80 w-full my-3">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#475569", fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" />
                    <Radar
                      name="Enterprise Score"
                      dataKey="score"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.35}
                    />
                    <Radar
                      name="Industry Benchmark"
                      dataKey="benchmark"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.15}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E2E8F0",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Enterprise Active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Industry Benchmark
                  </span>
                </div>
                <span>Total Samples: {totalAssessmentsCount} responses</span>
              </div>
            </div>

            {/* Dimension Breakdown Cards (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Culture Dimensions Explanations
              </h3>

              <div className="space-y-3 text-xs">
                {radarData?.map((dim: any) => (
                  <div key={dim.dimension} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{dim.dimension}</span>
                      <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {dim.score} / 100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-blue-900 text-xs leading-relaxed">
                <strong className="font-semibold text-blue-800">Psychological Safety Insight:</strong>{" "}
                High <em>Reporting Confidence</em> ensures employees report mistakes within minutes without fear of reprimand or disciplinary blame.
              </div>
            </div>
          </div>

          {/* Department Culture Overview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Department Security Culture Ranking
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {departments?.map((dept: any) => (
                <div
                  key={dept.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {dept.code}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-2">{dept.name}</h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Culture Score:</span>
                    <span className="text-sm font-extrabold text-blue-600">
                      {dept.cultureScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Live Assessment Tab (Interactive Form for Viva Examiners) */
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Interactive Live Psychometric Culture Assessment
              </h3>
              <p className="text-xs text-slate-500">
                Complete this 8-question Likert-scale & Situational Judgment Test (SJT) to calculate instant scores and watch the Department Human Risk Score update in real-time!
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/60">
              Real-Time SQLite Recalculation
            </span>
          </div>

          {submissionResult ? (
            <div className="p-6 rounded-xl bg-emerald-50/70 border-2 border-emerald-300 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Assessment Recorded & Department Risk Score Updated!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Your responses have been processed through the psychometric weighting engine.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Attitudes</span>
                  <span className="text-base font-bold text-slate-800">
                    {submissionResult.dimensionBreakdown.attitudes}%
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Behaviors</span>
                  <span className="text-base font-bold text-slate-800">
                    {submissionResult.dimensionBreakdown.behaviors}%
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Cognition</span>
                  <span className="text-base font-bold text-slate-800">
                    {submissionResult.dimensionBreakdown.cognition}%
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Compliance</span>
                  <span className="text-base font-bold text-slate-800">
                    {submissionResult.dimensionBreakdown.compliance}%
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Reporting Confidence</span>
                  <span className="text-base font-bold text-emerald-600">
                    {submissionResult.dimensionBreakdown.reportingConfidence}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
                <span>
                  Updated <strong>{submissionResult.updatedDepartment.name}</strong> Human Risk Score:
                </span>
                <span
                  className="font-extrabold px-2.5 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: submissionResult.updatedDepartment.riskColor }}
                >
                  {submissionResult.updatedDepartment.riskScore} ({submissionResult.updatedDepartment.riskTier} Risk)
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmissionResult(null);
                    setActiveTab("RADAR");
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-900 transition-colors"
                >
                  Return to Culture Radar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAssessmentSubmit} className="space-y-6">
              {/* Demographic Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Target Department
                  </label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    {departments?.map((d: any) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Respondent Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={respondentRole}
                    onChange={(e) => setRespondentRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* 8 Psychometric Questions */}
              <div className="space-y-4">
                {[
                  {
                    id: "q1",
                    dim: "Attitudes",
                    prompt: "Cybersecurity is primarily the responsibility of every employee, not just the IT security team.",
                    type: "likert",
                  },
                  {
                    id: "q2",
                    dim: "Attitudes",
                    prompt: "Adhering to security protocols helps protect company reputation, client assets, and employee privacy.",
                    type: "likert",
                  },
                  {
                    id: "q3",
                    dim: "Behaviors",
                    prompt: "I consistently lock my workstation screen when stepping away and never connect to open public Wi-Fi without VPN.",
                    type: "likert",
                  },
                  {
                    id: "q4",
                    dim: "Behaviors (SJT)",
                    prompt: "A recognized colleague asks you to hold the secured badge door open because they forgot their badge. What do you do?",
                    type: "sjt",
                    options: [
                      { text: "Politely direct them to the security reception desk to obtain a visitor badge (High Compliance)", val: 5 },
                      { text: "Hold the door open because you personally recognize their face (Authority/Convenience)", val: 2 },
                      { text: "Pretend not to see them and let the door close (Passive)", val: 3 },
                    ],
                  },
                  {
                    id: "q5",
                    dim: "Cognition / Awareness",
                    prompt: "I can accurately inspect email headers and detect homoglyph attacks (e.g., lookalike domains replacing 'l' with 'I').",
                    type: "likert",
                  },
                  {
                    id: "q6",
                    dim: "Cognition (SJT)",
                    prompt: "You receive an urgent message purportedly from your CEO requesting an immediate wire transfer or confidential spreadsheet. How do you respond?",
                    type: "sjt",
                    options: [
                      { text: "Verify the transaction via an independent, out-of-band communication channel (known phone/Slack) before acting", val: 5 },
                      { text: "Reply directly to the email asking if they really sent it", val: 2 },
                      { text: "Execute the request quickly because of executive urgency", val: 1 },
                    ],
                  },
                  {
                    id: "q7",
                    dim: "Compliance",
                    prompt: "I consistently comply with corporate data classification rules and refrain from storing sensitive credentials in plain text notes.",
                    type: "likert",
                  },
                  {
                    id: "q8",
                    dim: "Reporting Confidence (No Fear of Blame)",
                    prompt: "If I accidentally click a suspicious link or enter credentials, I feel safe reporting it immediately without fear of disciplinary blame.",
                    type: "likert",
                  },
                ].map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        {idx + 1}. {q.prompt}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {q.dim}
                      </span>
                    </div>

                    {q.type === "likert" ? (
                      <div className="flex items-center justify-between pt-1 gap-2 text-xs">
                        <span className="text-slate-400 text-[11px]">Strongly Disagree (1)</span>
                        <div className="flex items-center gap-3">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <label key={val} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={q.id}
                                value={val}
                                checked={answers[q.id] === val}
                                onChange={() => setAnswers({ ...answers, [q.id]: val })}
                                className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-xs text-slate-700 font-medium">{val}</span>
                            </label>
                          ))}
                        </div>
                        <span className="text-slate-400 text-[11px]">Strongly Agree (5)</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        {q.options?.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`block p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                              answers[q.id] === opt.val
                                ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt.val}
                              checked={answers[q.id] === opt.val}
                              onChange={() => setAnswers({ ...answers, [q.id]: opt.val })}
                              className="sr-only"
                            />
                            <span>{opt.text}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Recalculating HRS..." : "Submit Live Assessment"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
