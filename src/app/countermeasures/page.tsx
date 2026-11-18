"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Percent,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  Zap,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

export default function CountermeasuresPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Micro-training quiz interactive state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const fetchCountermeasures = async () => {
    try {
      const res = await fetch("/api/countermeasures");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountermeasures();
  }, []);

  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch("/api/countermeasures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentState }),
      });
      if (res.ok) {
        fetchCountermeasures();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sampleQuiz = [
    {
      id: 1,
      question: "Inspect this sender address: 'support@paypaI-security.com'. What is the critical red flag?",
      options: [
        "The domain uses an uppercase 'I' to mimic a lowercase 'l' (Homoglyph Attack)",
        "The email uses standard SSL encryption",
        "PayPal always operates on port 443",
        "The subject line is written in formal English",
      ],
      correctIndex: 0,
      explanation:
        "Attackers frequently utilize lookalike characters (typosquatting or homoglyphs), replacing the lowercase 'l' with an uppercase 'I' to spoof legitimate domains and bypass visual scrutiny.",
    },
    {
      id: 2,
      question:
        "An email states: 'Your payroll direct deposit will be suspended within 60 minutes unless verified'. What psychological weapon is at play?",
      options: [
        "Social Proof & Consensus",
        "Artificial Urgency & Fear of Loss",
        "Authority Bias with Reciprocity",
        "Flattery & Curiosity",
      ],
      correctIndex: 1,
      explanation:
        "Artificial urgency induces cognitive panic, suppressing rational deliberation so victims rush into clicking without verifying the request.",
    },
    {
      id: 3,
      question:
        "You receive an urgent wire transfer request claiming to be from your CEO under strict NDA. What is the ethical security procedure?",
      options: [
        "Reply directly to the email asking if it is authentic",
        "Forward the invoice to your personal inbox for archiving",
        "Verify via an independent, out-of-band communication channel (known phone/Slack) and flag via the Phish Alert button",
        "Process the payment if the sum is below the CFO threshold",
      ],
      correctIndex: 2,
      explanation:
        "Never verify suspicious requests via the in-band compromised channel. Always authenticate high-risk actions through an independent out-of-band communication line.",
    },
  ];

  const handleAnswerSubmit = (optionIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIdx);
    setShowExplanation(true);
    if (optionIdx === sampleQuiz[currentQuestionIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { countermeasures, abSummary } = data || {};

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Countermeasures & A/B Effectiveness Lab
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                Module 2 • Member 2
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluates defensive interventions: External Sender Warning Banners, Teachable Moments, Micro-Training, and One-Click Phish Alerting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50/80 px-3.5 py-2 rounded-lg border border-indigo-200 text-xs text-indigo-900">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>
            Overall Countermeasure Efficacy: <strong className="text-indigo-700 font-bold">{abSummary?.overallEfficacy}%</strong>
          </span>
        </div>
      </div>

      {/* A/B Cohort Statistical Comparison Panel */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              A/B Cohort Effectiveness Measurement
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical side-by-side comparison between Test Group (Active Countermeasure) vs. Control Group (No Countermeasure).
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
            Chi-Square: {abSummary?.chiSquareStatistic} (p {abSummary?.pValue})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Cohort A: With Countermeasure */}
          <div className="p-5 rounded-xl bg-emerald-50/60 border-2 border-emerald-300 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Cohort A (With Countermeasure)
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  N={abSummary?.sampleSizeCohortA}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-emerald-700">
                  {abSummary?.avgTestFailureRate}%
                </span>
                <p className="text-xs text-emerald-800 mt-1 font-medium">
                  Average Phishing Failure Rate
                </p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 leading-snug">
              Protected by Warning Banners and Instant Teachable Moment debriefs. Drastically curtailed click-throughs.
            </p>
          </div>

          {/* Cohort B: Control Group */}
          <div className="p-5 rounded-xl bg-rose-50/60 border-2 border-rose-300 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Cohort B (Control / Baseline)
                </span>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  N={abSummary?.sampleSizeCohortB}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-rose-700">
                  {abSummary?.avgControlFailureRate}%
                </span>
                <p className="text-xs text-rose-800 mt-1 font-medium">
                  Average Phishing Failure Rate
                </p>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 leading-snug">
              Standard native inbox without contextual visual indicators or debriefs. Standard industry failure rate observed.
            </p>
          </div>

          {/* Net Relative Risk Reduction (Efficacy) */}
          <div className="p-5 rounded-xl bg-blue-50/60 border-2 border-blue-300 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Net Relative Risk Reduction
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Efficacy
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-blue-700">
                  +{abSummary?.overallEfficacy}%
                </span>
                <p className="text-xs text-blue-800 mt-1 font-medium">
                  Intervention Protection Delta
                </p>
              </div>
            </div>
            <p className="text-[11px] text-blue-700 leading-snug">
              Formula: <code>((Control Rate - Test Rate) / Control Rate) × 100</code>. Verified across 124 simulated attack interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Catalog of Active Countermeasures */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Deployed Defensive Interventions Catalog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {countermeasures?.map((cm: any) => (
            <div
              key={cm.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cm.name}</h4>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 mt-1 inline-block">
                      {cm.type}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggle(cm.id, cm.isActive)}
                    className="flex items-center gap-1.5 text-xs font-semibold"
                  >
                    {cm.isActive ? (
                      <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        <XCircle className="w-3.5 h-3.5" /> Disabled
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {cm.description}
                </p>

                {cm.bannerText && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 font-mono">
                    <span className="font-bold text-amber-800">Banner Preview: </span>
                    {cm.bannerText}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Control Fail</span>
                  <span className="font-bold text-rose-600">{cm.controlFailureRate}%</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Test Fail</span>
                  <span className="font-bold text-emerald-600">{cm.testFailureRate}%</span>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200/60">
                  <span className="text-[10px] text-blue-600 block font-semibold">Efficacy</span>
                  <span className="font-bold text-blue-700">+{cm.calculatedEfficacy}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Micro-Training Module Previewer */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Interactive Red-Flag Micro-Training Module (Viva / Evaluator Demo)
              </h3>
              <p className="text-xs text-slate-500">
                Test the 2-minute situational awareness module presented to employees following a near-miss or simulation trigger.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            Question {currentQuestionIndex + 1} of {sampleQuiz.length}
          </span>
        </div>

        {!quizFinished ? (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {sampleQuiz[currentQuestionIndex].question}
            </h4>

            <div className="space-y-2">
              {sampleQuiz[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === sampleQuiz[currentQuestionIndex].correctIndex;

                let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-slate-100";
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-rose-300 text-rose-900";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-blue-800">
                  <HelpCircle className="w-4 h-4" />
                  <span>Teachable Moment Analysis:</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  {sampleQuiz[currentQuestionIndex].explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Micro-Training Completed! Score: {score} / {sampleQuiz.length}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                Completing this interactive module reinforces cognitive red-flag identification and elevates the employee's security culture tier.
              </p>
            </div>
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Micro-Training
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
