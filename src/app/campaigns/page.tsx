"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  Plus,
  Play,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ShieldAlert,
  Zap,
  Trash2,
  ExternalLink,
} from "lucide-react";
import InteractiveSandboxModal from "@/components/InteractiveSandboxModal";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form state for creating new campaign
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    vectorType: "CREDENTIAL_HARVESTING",
    difficulty: "MEDIUM",
    targetDepartment: "All Departments",
    targetCount: 25,
    emailSubject: "",
    senderName: "",
    senderEmail: "",
    emailBodyHtml: "",
    redFlags: "Unverified domain, High urgency hook, Suspicious link redirect",
  });

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      const json = await res.json();
      if (json.success) {
        setCampaigns(json.campaigns);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const redFlagsArray = newCampaign.redFlags
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newCampaign,
          redFlags: redFlagsArray,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsNewModalOpen(false);
        fetchCampaigns();
        // Reset form
        setNewCampaign({
          name: "",
          vectorType: "CREDENTIAL_HARVESTING",
          difficulty: "MEDIUM",
          targetDepartment: "All Departments",
          targetCount: 25,
          emailSubject: "",
          senderName: "",
          senderEmail: "",
          emailBodyHtml: "",
          redFlags: "Unverified domain, High urgency hook, Suspicious link redirect",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vectorType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetDepartment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Simulation Campaigns & Attack Scenarios
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                Module 1 • Member 1
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage enterprise spear-phishing campaigns, credential harvesting templates, and live telemetry tracking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsSandboxOpen(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Live Interactive Sandbox</span>
          </button>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Simulation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["ALL", "ACTIVE", "COMPLETED", "SCHEDULED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === status
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search campaigns, vectors, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Campaign Name & Vector</th>
                <th className="py-3.5 px-4">Target Dept</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Targets</th>
                <th className="py-3.5 px-4">Click Rate</th>
                <th className="py-3.5 px-4">Submit Rate (Fail)</th>
                <th className="py-3.5 px-4">Report Rate</th>
                <th className="py-3.5 px-4">Countermeasure</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-xs">{camp.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 font-semibold">
                        {camp.vectorType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Diff: {camp.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {camp.targetDepartment}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        camp.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : camp.status === "COMPLETED"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium">{camp.targetCount}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-amber-600">
                    {camp.clickRate}% ({camp.clickCount})
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-rose-600">
                    {camp.submitRate}% ({camp.submitCount})
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-emerald-600">
                    {camp.reportRate}% ({camp.reportCount})
                  </td>
                  <td className="py-3.5 px-4">
                    {camp.countermeasure ? (
                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                        {camp.countermeasure.name}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">None (Control)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setIsSandboxOpen(true)}
                      className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium transition-colors border border-slate-200"
                    >
                      Test in Sandbox
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Launch New Simulation" Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Launch New Social Engineering Simulation
                </h3>
                <p className="text-xs text-slate-500">
                  Configure attack vector, target department, and defensive cohort parameters.
                </p>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mandatory Payroll System Migration Lure"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Attack Vector Type
                  </label>
                  <select
                    value={newCampaign.vectorType}
                    onChange={(e) => setNewCampaign({ ...newCampaign, vectorType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="CREDENTIAL_HARVESTING">Credential Harvesting</option>
                    <option value="CEO_PRETEXTING">CEO Pretexting / Authority Lure</option>
                    <option value="IT_VPN_RESET">IT VPN / Gateway Reset</option>
                    <option value="FAKE_MFA_PROMPT">Fake MFA Push Fatigue</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Department
                  </label>
                  <select
                    value={newCampaign.targetDepartment}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, targetDepartment: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Finance">Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IT Service Desk"
                    value={newCampaign.senderName}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, senderName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sender Spoofed Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="servicedesk@internal-portal-verify.net"
                    value={newCampaign.senderEmail}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, senderEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. URGENT: Action Required to Verify SSO Credentials"
                  value={newCampaign.emailSubject}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, emailSubject: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Psychological Red Flags (comma separated)
                </label>
                <input
                  type="text"
                  value={newCampaign.redFlags}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, redFlags: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Ethical Hacking Guardrail:</strong> Zero-Password Policy is enforced on all landing pages dispatched from this engine.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Dispatch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Split Screen Sandbox Modal */}
      <InteractiveSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        campaigns={campaigns}
        onEventLogged={fetchCampaigns}
      />
    </div>
  );
}
