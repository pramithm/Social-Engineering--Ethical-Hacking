# Social Engineering Countermeasures Effectiveness Measurement and Security Culture Assessment Platform (HumanRisk SEC)

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-darkblue?logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20Local-lightblue?logo=sqlite)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Zero Cloud Dependency](https://img.shields.io/badge/Execution-100%25%20Local-emerald)](#zero-friction-local-execution)

> **Ethical Hacking & Cybersecurity Capstone Project**  
> An enterprise-grade, locally deployable human risk assessment and defensive countermeasure evaluation platform designed to quantify human vulnerability, validate security controls through A/B cohorts, and diagnose 5-dimensional security culture.

---

## 🏛️ Team Architecture (3 Core Modules for 3 Team Members)

The architecture is partitioned into three decoupled modules so team members can independently defend and demonstrate their components:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              HUMANRISK SEC: CAPSTONE ARCHITECTURE & TEAM OWNERSHIP              │
├─────────────────────────┬─────────────────────────┬─────────────────────────────┤
│   MODULE 1 (Member 1)   │   MODULE 2 (Member 2)   │     MODULE 3 (Member 3)     │
│   Simulation & Telemetry│ Countermeasures & A/B   │ Culture Diagnostics & HRS   │
├─────────────────────────┼─────────────────────────┼─────────────────────────────┤
│ • Attack Vector Engines │ • Warning Banners       │ • 5D Psychometric Surveys   │
│ • Tokenized Lures       │ • Teachable Moments     │ • Composite HRS Formula     │
│ • Split-Screen Sandbox  │ • A/B Cohort Efficacy   │ • Department Heatmaps       │
│ • Telemetry Tracker     │ • Micro-Training Lab    │ • NIST & ISO 27001 Audits   │
└─────────────────────────┴─────────────────────────┴─────────────────────────────┘
```

### Module 1: Social Engineering Simulation & Telemetry Engine (Member 1)
- **Primary Routes:** `/campaigns`, `/api/campaigns`, `/api/simulations/event`
- **Capabilities:**
  - Configurable attack vectors: `CREDENTIAL_HARVESTING`, `CEO_PRETEXTING`, `IT_VPN_RESET`, `FAKE_MFA_PROMPT`.
  - Tokenized simulation dispatch with realistic webmail chrome.
  - Interactive split-screen attack simulator with live SOC telemetry logging.
  - **Ethical Hacking Guardrail:** Password strings are intercepted and dropped directly in memory; only interaction booleans (`clicked_link`, `submitted_form`, `reported_phish`, `dwell_time_seconds`) are saved.

### Module 2: Countermeasures & A/B Intervention Hub (Member 2)
- **Primary Routes:** `/countermeasures`, `/api/countermeasures`
- **Capabilities:**
  - Catalog of active defensive countermeasures (External Sender Banners, Zero-Delay Teachable Moments, Micro-Training, One-Click Phish Alert Button).
  - Empirical **A/B Cohort Effectiveness Lab**: Statistically compares Test Cohort ($N=64$, with countermeasure) vs. Control Cohort ($N=60$, baseline).
  - Chi-square statistical test ($\chi^2 = 9.54, p < 0.001$, Odds Ratio $= 0.183$) proving significant risk reduction.
  - Interactive 3-question Red-Flag Micro-Training quiz with instant feedback.

### Module 3: Security Culture Diagnostics & Human Risk Analytics (Member 3)
- **Primary Routes:** `/culture`, `/departments`, `/reports`, `/api/culture`, `/api/departments`, `/api/reports/audit`
- **Capabilities:**
  - 5-Dimensional Culture Diagnostics Radar Chart (*Attitudes, Behaviors, Cognition, Compliance, Reporting Confidence*).
  - Live 8-question psychometric Likert-scale and Situational Judgment Test (SJT) form that updates department HRS in real time.
  - Department drill-downs highlighting psychological vulnerabilities (*Authority Bias in Finance*, *Urgency Susceptibility in Marketing*).
  - Executive compliance audit view aligned with **NIST CSF 2.0 (PR.AT-01, PR.AT-02, DE.AE-02)** and **ISO/IEC 27001:2022 (A.7.2.2)** with CSV export.

---

## 📐 Mathematical Formulation

### 1. Composite Human Risk Score (HRS)
$$\text{HRS} = (0.45 \times \text{Failure Rate}) + (0.35 \times (100 - \text{Culture Score})) + (0.20 \times \text{Dwell Time Penalty})$$
- **$\text{Failure Rate}$ ($45\%$ Weight):** The percentage of phishing simulation targets that entered credentials or downloaded payloads ($0 - 100\%$).
- **$100 - \text{Culture Score}$ ($35\%$ Weight):** The inverse of the 5-dimensional security culture score, quantifying cultural susceptibility.
- **$\text{Dwell Time Penalty}$ ($20\%$ Weight):** Derived from response latency:
  $$\text{Dwell Penalty} = \min\left(100, \max\left(10, \frac{\text{Mean Dwell Seconds}}{240} \times 100\right)\right)$$
- **Risk Tiers:**
  - $0 - 29.9$: **Low Risk** (Emerald `#10B981`)
  - $30.0 - 44.9$: **Moderate Risk** (Royal Blue `#2563EB`)
  - $45.0 - 64.9$: **Elevated Risk** (Amber `#F59E0B`)
  - $65.0 - 100.0$: **Critical Risk** (Rose/Crimson `#EF4444`)

### 2. Relative Countermeasure Efficacy Rate
$$\text{Efficacy (\%)} = \left(\frac{\text{Control Failure Rate} - \text{Test Failure Rate}}{\text{Control Failure Rate}}\right) \times 100$$
*Baseline Control Failure Rate ($26.6\%$) dropped to Test Failure Rate ($5.8\%$), yielding a $+78.2\%$ net relative risk reduction.*

---

## 🛡️ Ethical Hacking Scope & Privacy Architecture

1. **Zero-Password Storage Policy:**
   Simulated login landing pages explicitly drop all password strings in memory before recording telemetry. No hashes, plaintext, or sensitive tokens are stored.
2. **Blameless Non-Punitive Culture:**
   Near-misses trigger immediate educational debriefs (*Teachable Moments*) rather than disciplinary actions.
3. **Contained Environment:**
   No external tracking beacons, weaponized binaries, or network lateral movement. Runs 100% locally.

---

## ⚡ Zero-Friction Local Execution (Quickstart)

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm 10+
- Python 3.10+ (for optional analytical companion)

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Push Schema
```bash
npx prisma db push
```

### 3. Seed Realistic Enterprise Data (25+ Employees, 5 Campaigns, A/B Cohorts)
```bash
npx prisma db seed
```

### 4. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📊 Application Navigation (6 Complete Pages)

| Route | Page Title | Module Attribution | Key Features |
|---|---|---|---|
| `/dashboard` | Executive Overview | Executive Suite | Top 4 KPI cards, 6-Month Risk Trend AreaChart, Dept BarChart, Live Telemetry Stream |
| `/campaigns` | Simulation Engine | Module 1 (Member 1) | Campaign directory, "Launch New Simulation" modal, Split-Screen Interactive Attack Sandbox |
| `/countermeasures`| Countermeasures & A/B Lab | Module 2 (Member 2) | Active Countermeasures Catalog, A/B Cohort Comparison, 3-Question Micro-Training Quiz |
| `/culture` | Culture Assessment Portal | Module 3 (Member 3) | 5-Dimensional Radar/Spider Chart, Live 8-Question Assessment Form (recalculates HRS live) |
| `/departments` | Department Risk Matrix | Module 3 (Member 3) | Mathematical formula deconstruction, psychological bias cards, employee directory |
| `/reports` | Audit & Ethical Guardrails | Audit & Governance | NIST CSF & ISO 27001 compliance table, CSV telemetry export, printable executive audit |

---

## 🐍 Python Companion Evaluation Tool

A dedicated statistical evaluation script is included in `scripts/evaluate_stats.py`:

```bash
# Optional: Set up virtual environment
python -m venv .venv
.venv\Scripts\activate      # Windows

# Run statistical evaluation
python scripts/evaluate_stats.py
```

---

## 📁 Repository Directory Structure

```
├── prisma/
│   ├── schema.prisma       # SQLite data models (Department, User, Campaign, Countermeasure, CultureAssessment)
│   ├── dev.db              # Local SQLite database file
│   └── seed.ts             # Rich enterprise seed script (28 users, 5 departments, 5 campaigns, A/B cohorts)
├── src/
│   ├── app/
│   │   ├── api/            # Complete REST API routes
│   │   │   ├── campaigns/
│   │   │   ├── countermeasures/
│   │   │   ├── culture/
│   │   │   ├── departments/
│   │   │   ├── reports/
│   │   │   ├── reset-data/
│   │   │   ├── simulations/event/
│   │   │   └── stats/overview/
│   │   ├── campaigns/      # Module 1 page
│   │   ├── countermeasures/# Module 2 page
│   │   ├── culture/        # Module 3 page
│   │   ├── dashboard/      # Executive Overview page
│   │   ├── departments/    # Module 3 page
│   │   ├── reports/        # Ethical Audit & NIST report page
│   │   ├── globals.css     # Clean light-mode design system
│   │   ├── layout.tsx      # Root layout with sidebar and header
│   │   └── page.tsx        # Redirects root to /dashboard
│   ├── components/
│   │   ├── Header.tsx      # Navigation header with quick sandbox and baseline reset
│   │   ├── Sidebar.tsx     # Persistent left sidebar with module owner tags
│   │   └── InteractiveSandboxModal.tsx # Split-screen live attack sandbox
│   └── lib/
│       ├── prisma.ts       # Prisma Client singleton
│       └── risk-calculator.ts # Mathematical formulas for HRS & Efficacy
├── scripts/
│   └── evaluate_stats.py   # Statistical validation script (Chi-Square & Contingency tests)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---
*Built for Ethical Hacking & Cybersecurity Capstone Defense.*
