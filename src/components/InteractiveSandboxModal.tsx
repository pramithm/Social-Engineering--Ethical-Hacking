"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Eye,
  Send,
  Lock,
  ExternalLink,
  ChevronRight,
  Info,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";

interface CampaignItem {
  id: string;
  name: string;
  vectorType: string;
  emailSubject: string;
  senderName: string;
  senderEmail: string;
  emailBodyHtml: string;
  redFlagsList: string[];
  countermeasure?: {
    id: string;
    name: string;
    type: string;
    bannerText?: string;
  } | null;
}

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: CampaignItem[];
  onEventLogged?: () => void;
}

export default function InteractiveSandboxModal({
  isOpen,
  onClose,
  campaigns,
  onEventLogged,
}: SandboxModalProps) {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [enableBanner, setEnableBanner] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<"EMAIL" | "LANDING" | "TEACHABLE" | "REPORTED">("EMAIL");
  const [telemetryLogs, setTelemetryLogs] = useState<Array<{ timestamp: string; text: string; type: string }>>([]);
  const [mockEmailInput, setMockEmailInput] = useState("sarah.miller@enterprise.internal");
  const [mockPasswordInput, setMockPasswordInput] = useState("P@ssw0rd2026!");
  const [elapsedSeconds, setElapsedSeconds] = useState(14);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(campaigns[0].id);
    }
  }, [campaigns, selectedCampaignId]);

  if (!isOpen) return null;

  const currentCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const addTelemetryLog = (text: string, type: "info" | "warn" | "success" | "danger") => {
    const time = new Date().toLocaleTimeString();
    setTelemetryLogs((prev) => [{ timestamp: time, text, type }, ...prev.slice(0, 8)]);
  };

  const handleSimulateClick = async () => {
    setIsSubmitting(true);
    addTelemetryLog(`[TELEMETRY] Target clicked simulation lure link in "${currentCampaign?.name}"`, "warn");
    try {
      await fetch("/api/simulations/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: currentCampaign.id,
          eventType: "CLICKED",
          timeToInteractSeconds: elapsedSeconds,
          countermeasureApplied: enableBanner,
          countermeasureType: enableBanner ? "WARNING_BANNER" : "NONE",
          notes: "Target clicked phishing link in split-screen sandbox demo.",
        }),
      });
      setCurrentStep("LANDING");
      if (onEventLogged) onEventLogged();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    addTelemetryLog(
      `[ETHICAL GUARDRAIL] Password string intercepted and DISCARDED. Zero-Credential Storage policy enforced.`,
      "danger"
    );
    addTelemetryLog(
      `[TELEMETRY] Simulation failure recorded: Target submitted fake credentials. Launching Teachable Moment!`,
      "danger"
    );

    try {
      await fetch("/api/simulations/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: currentCampaign.id,
          eventType: "SUBMITTED",
          timeToInteractSeconds: elapsedSeconds + 12,
          countermeasureApplied: enableBanner,
          passwordDiscarded: true,
          notes: "Submitted mock form. Password discarded per ethical policy.",
        }),
      });
      setCurrentStep("TEACHABLE");
      if (onEventLogged) onEventLogged();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateReport = async () => {
    setIsSubmitting(true);
    addTelemetryLog(
      `[DEFENSE SUCCESS] One-Click Phish Alert triggered! Lure quarantined from mailbox in ${elapsedSeconds}s.`,
      "success"
    );

    try {
      await fetch("/api/simulations/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: currentCampaign.id,
          eventType: "REPORTED",
          timeToInteractSeconds: elapsedSeconds,
          countermeasureApplied: true,
          countermeasureType: "ONE_CLICK_REPORT_BUTTON",
          notes: `User reported phishing lure via client extension in ${elapsedSeconds} seconds.`,
        }),
      });
      setCurrentStep("REPORTED");
      if (onEventLogged) onEventLogged();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSandbox = () => {
    setCurrentStep("EMAIL");
    setElapsedSeconds(14);
    addTelemetryLog("[SANDBOX RESET] Scenario reloaded for fresh live test.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Live Attack Sandbox & Interactive Telemetry Simulator
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Module 1 & 2 Demo
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Split-screen interactive demonstration of attack vectors, defensive banners, and zero-delay teachable moments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetSandbox}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sandbox Controls Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Select Attack Scenario:</span>
            <select
              value={selectedCampaignId}
              onChange={(e) => {
                setSelectedCampaignId(e.target.value);
                setCurrentStep("EMAIL");
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.vectorType})
                </option>
              ))}
            </select>
          </div>

          {/* Countermeasure Toggle (A/B Test Demonstration) */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
              Countermeasure Banner (A/B Testing):
            </span>
            <button
              onClick={() => setEnableBanner(!enableBanner)}
              className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-colors ${
                enableBanner
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-slate-200 text-slate-600 border border-slate-300"
              }`}
            >
              {enableBanner ? "ENABLED (Test Group A)" : "DISABLED (Control Group B)"}
            </button>
          </div>
        </div>

        {/* Main Split-Screen Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-100/70">
          {/* Left Pane (7 cols): Realistic Email Client / Landing Page */}
          <div className="lg:col-span-7 p-5 overflow-y-auto flex flex-col space-y-4">
            {/* Step 1: Simulated Corporate Email Client */}
            {currentStep === "EMAIL" && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
                {/* Email Client Window Header */}
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Corporate Webmail Inbox</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-400">Target: sarah.miller@enterprise.internal</span>
                  </div>

                  {/* One-Click Phish Alert Button */}
                  <button
                    onClick={handleSimulateReport}
                    disabled={isSubmitting}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Report Phish
                  </button>
                </div>

                {/* Email Header Info */}
                <div className="p-4 border-b border-slate-100 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {currentCampaign?.emailSubject}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">
                          {currentCampaign?.senderName}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          &lt;{currentCampaign?.senderEmail}&gt;
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">Today, 10:42 AM</span>
                  </div>
                </div>

                {/* Countermeasure Banner (If Enabled) */}
                {enableBanner && (
                  <div className="mx-4 mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-[10px] text-amber-700">
                        External Sender Warning Banner (Countermeasure Active)
                      </span>
                      <p className="mt-0.5 text-[11px] leading-relaxed">
                        CAUTION: This message originated from outside the enterprise network. The sender address{" "}
                        <strong className="underline">{currentCampaign?.senderEmail}</strong> has not been verified.
                        Do not click links or provide credentials.
                      </p>
                    </div>
                  </div>
                )}

                {/* Email Body Content */}
                <div className="p-5 text-sm text-slate-700 space-y-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentCampaign?.emailBodyHtml || "<p>Simulated phishing content</p>",
                    }}
                  />

                  {/* Visual Click Simulation Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Simulate employee behavior:
                    </p>
                    <button
                      onClick={handleSimulateClick}
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Simulate Employee Clicking Link
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Simulated Phishing Landing Page (Zero-Credential Guardrail) */}
            {currentStep === "LANDING" && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-800 text-slate-200 px-4 py-2 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-[11px] text-amber-300">
                      https://login-auth-verify.internal-gateway.net/auth
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Mock Phishing Page</span>
                </div>

                <div className="p-6 max-w-md mx-auto w-full space-y-4">
                  <div className="text-center space-y-1">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                      SSO
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Single Sign-On Authentication
                    </h3>
                    <p className="text-xs text-slate-500">
                      Verify your identity to proceed to the requested resource.
                    </p>
                  </div>

                  {/* Zero-Credential Storage Callout */}
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px] flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      <strong>Ethical Guardrail:</strong> Passwords are intentionally discarded. No raw credentials are stored in SQLite.
                    </span>
                  </div>

                  <form onSubmit={handleSimulateSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        value={mockEmailInput}
                        onChange={(e) => setMockEmailInput(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Domain Password
                      </label>
                      <input
                        type="password"
                        value={mockPasswordInput}
                        onChange={(e) => setMockPasswordInput(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Sign In & Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Step 3: Zero-Delay Teachable Moment Red-Flag Breakdown */}
            {currentStep === "TEACHABLE" && (
              <div className="bg-white rounded-xl shadow-xs border-2 border-rose-300 overflow-hidden flex flex-col p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                      Module 2 • Instant Teachable Moment
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      Hold On! This was a Simulated Phishing Exercise.
                    </h3>
                    <p className="text-xs text-slate-600">
                      You are completely safe. No actual credentials were harvested or saved. Here is how to spot this next time:
                    </p>
                  </div>
                </div>

                {/* Red Flags Deconstruction */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Identified Red Flags & Psychological Triggers:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {currentCampaign?.redFlagsList?.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80 text-rose-950 text-xs flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{flag}</p>
                          <p className="text-[11px] text-rose-700 mt-0.5">
                            Attackers leverage this pattern to induce urgency and bypass critical judgment.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-800 font-bold">Recommended Defensive Action:</strong>
                    <p className="text-[11px] mt-0.5 text-emerald-700">
                      Never enter credentials after clicking an unverified link. Always use the <strong>One-Click Phish Alert</strong> button or independently verify urgent requests out-of-band.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={resetSandbox}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                  >
                    Try Another Simulation
                  </button>
                  <span className="text-[11px] text-slate-400">
                    Telemetry logged to SQLite database in real time.
                  </span>
                </div>
              </div>
            )}

            {/* Step 4: Reported Phish State */}
            {currentStep === "REPORTED" && (
              <div className="bg-white rounded-xl shadow-xs border-2 border-emerald-300 p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Excellent Catch! Phish Neutralized in {elapsedSeconds} Seconds.
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                    Your quick action triggered immediate automated quarantine across all mailboxes and alerted our SOC.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+15 Culture Recognition Points Awarded</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetSandbox}
                    className="text-xs font-semibold px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Test Another Vector
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Pane (5 cols): Live Telemetry & Inspector */}
          <div className="lg:col-span-5 bg-white border-l border-slate-200 p-5 flex flex-col space-y-4 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  Live SOC Telemetry Stream
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Real-Time SQLite</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Module 1 engine records interaction events without storing user passwords.
              </p>
            </div>

            {/* Campaign Meta Card */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Vector Type:</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {currentCampaign?.vectorType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Dept:</span>
                <span className="font-semibold text-slate-800">Finance & Engineering</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Phase:</span>
                <span className="font-bold text-blue-600">{currentStep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Elapsed Dwell Time:</span>
                <span className="font-mono font-semibold text-slate-700">{elapsedSeconds}s</span>
              </div>
            </div>

            {/* Live Event Feed */}
            <div className="flex-1 flex flex-col space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Incoming Event Log
              </span>
              <div className="flex-1 bg-slate-900 text-slate-200 rounded-lg p-3 font-mono text-[11px] space-y-2 overflow-y-auto min-h-[220px]">
                {telemetryLogs.length === 0 ? (
                  <div className="text-slate-500 italic p-2">
                    Waiting for user interaction... Click a link or button on the left pane to stream live events.
                  </div>
                ) : (
                  telemetryLogs.map((log, i) => (
                    <div key={i} className="border-b border-slate-800 pb-1.5 last:border-0">
                      <span className="text-slate-400">[{log.timestamp}]</span>{" "}
                      <span
                        className={
                          log.type === "danger"
                            ? "text-rose-400"
                            : log.type === "success"
                            ? "text-emerald-400"
                            : log.type === "warn"
                            ? "text-amber-400"
                            : "text-blue-400"
                        }
                      >
                        {log.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Ethical Guardrail Proof Card */}
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Zero-Credential Storage Verification</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Form inputs are inspected by the ethical filter. The raw password field is strictly dropped in memory before SQLite persistence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
