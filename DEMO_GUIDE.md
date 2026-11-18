# 🎯 Practical Viva & Presentation Demonstration Guide
## Project: Social Engineering Countermeasures Effectiveness Measurement and Security Culture Assessment Platform (HumanRisk SEC)

This guide provides an exact, step-by-step walkthrough for demonstrating the platform during your Capstone Viva, Project Exhibition, or Examiner Review.

---

## ⏱️ Suggested Presentation Timeline (10 - 12 Minutes Total)

| Phase | Time | Speaker | Route / Screen | Key Action |
|---|---|---|---|---|
| **Phase 0: Setup** | Before demo | All Members | Terminal & Browser | Start server (`npm run dev`) and open `http://localhost:3000` |
| **Phase 1: Executive Overview** | 2 mins | Team Lead / Member 1 | `/dashboard` | Problem statement, 4 KPIs, 6-Month Risk Reduction curve |
| **Phase 2: Simulation & Sandbox** | 3 mins | **Member 1** (Simulation Lead) | `/campaigns` & Sandbox Modal | Trigger split-screen attack, demonstrate Zero-Password discard, show Teachable Moment & 1-Click Report |
| **Phase 3: Defensive A/B Lab** | 3 mins | **Member 2** (Defense Lead) | `/countermeasures` | A/B Cohort statistical significance ($\chi^2 = 9.54, p < 0.001$), 3-Question Micro-Training test |
| **Phase 4: Culture & Department Matrix**| 3 mins | **Member 3** (Analytics Lead) | `/culture` & `/departments` | 5D Radar chart, Live viva assessment submission, HRS formula deconstruction |
| **Phase 5: Audit & Conclusion** | 1 min | Shared / Member 3 | `/reports` & Terminal | NIST/ISO audit export, CSV download, Python statistical script |

---

## 🎬 Step-by-Step Practical Demonstration Walkthrough

### 🚀 Phase 0: Pre-Demo Local Setup (30 Seconds)
1. Open PowerShell or Terminal in the project root:
   ```bash
   npm run dev
   ```
2. Open Chrome/Edge at **`http://localhost:3000`**.
3. Point out to the examiners:
   > *"Our entire platform runs 100% locally on this machine using Next.js 14 and SQLite with zero external cloud dependencies or third-party tracking APIs."*

---

### 📊 Phase 1: Executive Overview & The Problem Statement (2 Mins)
**Screen: `/dashboard`**

1. **State the Core Problem:**
   > *"Traditional cybersecurity spends 95% of budgets on technical firewalls, yet over 80% of enterprise breaches originate at the human layer via social engineering. Our platform moves security from reactive punishment to quantitative measurement and cultural resilience."*

2. **Walk Through the Top 4 KPI Cards:**
   - **Org Human Risk Score (HRS):** $28.8 / 100$ (Low/Moderate Tier, down 18.2 points).
   - **Simulation Failure Rate:** $12.1\%$ (industry average is $27.5\%$).
   - **Phishing Reporting Rate:** $68.2\%$ (up from $24\%$ baseline).
   - **Mean Time to Report (MTTR):** $2.4\text{ minutes}$ (down from $42\text{ minutes}$, allowing SOC to quarantine lures before widespread clicks).

3. **Show Chart 1 (6-Month Risk Reduction Trend):**
   - Point out the red area (*Failure Rate*) dropping from $31.4\%$ down to $12.1\%$ as countermeasures were phased in.
   - Point out the green area (*Reporting Rate*) rising from $24\%$ up to $68.2\%$.

4. **Highlight the Capstone Team Ownership Card:**
   - Point to the card on the bottom right:
     - **Member 1:** Module 1 — Simulation & Telemetry
     - **Member 2:** Module 2 — Countermeasures & A/B Hub
     - **Member 3:** Module 3 — Culture Diagnostics & Risk Analytics

---

### 🎣 Phase 2: Live Attack Simulation & Ethical Guardrails (3 Mins)
**Presenter: Member 1**  
**Screen: `/campaigns`**

1. **Explain the Campaign Management Table:**
   - Show active campaigns: `CEO Pretexting`, `IT VPN Reset`, `Credential Harvesting`, `MFA Push Fatigue`.
   - Point out target counts, click rates, submit rates, and report rates.

2. **Launch the Live Attack Sandbox:**
   - Click the purple **"Live Interactive Sandbox"** button (or the blue button in the top header).
   - A split-screen window appears:
     - **Left Pane:** Corporate Webmail client showing the phishing lure.
     - **Right Pane:** Live SOC Telemetry stream recording SQLite events in real time.

3. **Demonstrate Scenario A: Credential Submission & Teachable Moment:**
   - Select the campaign: **"Q4 Executive Authority Lure - CEO Urgent Wire"**.
   - Notice the amber **External Sender Warning Banner** at the top of the email.
   - Click **"Simulate Employee Clicking Link"**.
   - The screen transitions to the simulated **Single Sign-On (SSO)** login portal.
   - **Crucial Ethical Guardrail Point:**
     > *"Notice this ethical privacy callout. In strict compliance with privacy standards and ethical hacking guardrails, our platform enforces a Zero-Credential Storage Policy. We NEVER save passwords into SQLite."*
   - Type any dummy email and password (`P@ssw0rd2026!`) and click **"Sign In & Continue"**.
   - Point to the right-hand terminal log:
     > `[ETHICAL GUARDRAIL] Password string intercepted and DISCARDED. Zero-Credential Storage policy enforced.`
     > `[TELEMETRY] Simulation failure recorded. Launching Teachable Moment!`
   - Show the **Zero-Delay Teachable Moment Red-Flag Breakdown Screen**:
     - Red Flag 1: Sender domain discrepancy (`@corp-exec-secure.com`).
     - Red Flag 2: Artificial urgency (`"Action Required Today"`).
     - Red Flag 3: Direct wire request bypassing standard purchase order channels.

4. **Demonstrate Scenario B: The One-Click Phish Alert:**
   - Click **"Try Another Simulation"** and select **"IT Infrastructure Emergency SSL VPN Gateway Reset"**.
   - Click the green **"Report Phish"** button in the webmail header.
   - Show the success celebration:
     > *"Threat neutralized in 14 seconds! +15 Culture Recognition Points Awarded."*
   - Point to the right-hand pane showing real-time event logged to SQLite.
   - Close the sandbox modal.

---

### 🛡️ Phase 3: Defensive Countermeasures & A/B Cohort Efficacy (3 Mins)
**Presenter: Member 2**  
**Screen: `/countermeasures`**

1. **Explain the Defensive Interventions Catalog:**
   - Review the 4 active countermeasures:
     1. *External Sender Warning Banners* (Contextual gateway banners)
     2. *Zero-Delay Teachable Moment Overlays* (Instant cognitive debrief)
     3. *2-Minute Interactive Red-Flag Micro-Training* (Gamified situational quizzes)
     4. *One-Click Phish Alert Button* (Client reporting extension)
   - Show that each countermeasure can be toggled active or disabled with real-time database updates.

2. **Demonstrate the A/B Cohort Statistical Comparison:**
   - Walk the examiners through the 3 side-by-side cards:
     - **Cohort A (With Countermeasure):** $N = 64$, Failure Rate = $5.8\%$.
     - **Cohort B (Control Group):** $N = 60$, Failure Rate = $26.6\%$.
     - **Net Relative Risk Reduction (Efficacy):** **$+78.2\%$**.
   - Show the statistical validation formula:
     $$\text{Efficacy} = \frac{\text{Control Fail} - \text{Test Fail}}{\text{Control Fail}} \times 100 = \frac{26.6 - 5.8}{26.6} \times 100 = 78.2\%$$
   - Emphasize the empirical statistical significance badge:
     > *"Chi-Square $\chi^2 = 9.54, p < 0.001$, Odds Ratio $= 0.183$. This proves the reduction is statistically significant, not random noise."*

3. **Click Through the Interactive Micro-Training Module Live:**
   - Scroll down to the **"Interactive Red-Flag Micro-Training Module"**.
   - Question 1: *"Inspect this sender address: 'support@paypaI-security.com'. What is the critical red flag?"*
   - Click the first option: *"The domain uses an uppercase 'I' to mimic a lowercase 'l' (Homoglyph Attack)"*.
   - Show the instant explanation card detailing typosquatting and homoglyphs.
   - Click **"Next Question"** and answer Question 2 (*Artificial Urgency & Fear of Loss*).

---

### 🧠 Phase 4: Security Culture Diagnostics & Live Viva Assessment (3 Mins)
**Presenter: Member 3**  
**Screens: `/culture` and `/departments`**

1. **Explain the 5-Dimensional Culture Model on `/culture`:**
   - Point out the **Recharts Spider/Radar Chart**:
     1. **Attitudes:** Employee perception of cybersecurity ownership.
     2. **Behaviors:** Daily adherence to physical and workstation security.
     3. **Cognition / Awareness:** Ability to detect technical phishing indicators.
     4. **Compliance:** Adherence to organizational policy and data classifications.
     5. **Reporting Confidence (No Fear of Blame):** Psychological safety to report mistakes.

2. **Perform a Live Assessment In Front of the Examiners:**
   - Click the **"Take Live Assessment (Demo)"** tab.
   - Tell the evaluators:
     > *"Let's simulate a live employee from the Finance department completing their quarterly diagnostic survey right now."*
   - Select Department: **"Finance (FIN)"**.
   - Answer the 8 questions live:
     - Q1 (Attitudes): Strongly Agree (5)
     - Q2 (Attitudes): Agree (4)
     - Q3 (Behaviors): Agree (4)
     - Q4 (Behaviors SJT): Select *"Politely direct them to the security reception desk"* (Option 1)
     - Q5 (Cognition): Agree (4)
     - Q6 (Cognition SJT): Select *"Verify transaction via an independent out-of-band channel"* (Option 1)
     - Q7 (Compliance): Agree (4)
     - Q8 (Reporting Confidence): Strongly Agree (5)
   - Click **"Submit Live Assessment"**.
   - Watch the screen display the updated dimension breakdown and dynamic recalculation of the Finance department's Human Risk Score!

3. **Navigate to `/departments` (The Mathematical Risk Matrix):**
   - Show the formula banner:
     $$\text{HRS} = (0.45 \times \text{Failure Rate}) + (0.35 \times (100 - \text{Culture})) + (0.20 \times \text{Dwell Penalty})$$
   - Click on the **"Finance"** department card to expand it:
     - Show the exact mathematical weighted points:
       - Failure Rate Component ($45\%$): $0.45 \times 28.6\% = 12.9\text{ pts}$
       - Culture Vulnerability ($35\%$): $0.35 \times (100 - 58.5) = 14.5\text{ pts}$
       - Dwell Time Penalty ($20\%$): $0.20 \times 89.6 = 17.9\text{ pts}$
       - **Composite HRS = $45.3 / 100$ (Elevated Risk)**
   - Highlight the **Psychological Bias Anomaly Card**:
     - Point out **Authority Bias: 82%** in Finance.
     - Prescribed countermeasure: *Executive Impersonation (CEO Fraud) & Dual-Authorization Protocol Drills*.
   - Contrast with **Marketing**: High Urgency Susceptibility (81%).

---

### 📋 Phase 5: Executive Audit, Compliance & Conclusion (1 Min)
**Presenter: Shared / Member 3**  
**Screen: `/reports` & Terminal**

1. **Show Regulatory Framework Compliance on `/reports`:**
   - Display the compliance mapping table:
     - **NIST CSF 2.0 PR.AT-01:** Social engineering awareness training (Compliant, 94%).
     - **NIST CSF 2.0 PR.AT-02:** Role-based high-risk training (Compliant, 91%).
     - **NIST CSF 2.0 DE.AE-02:** Rapid phishing telemetry & MTTR reduction (Compliant, 96%).
     - **ISO/IEC 27001:2022 A.7.2.2:** Information security awareness & education (Compliant, 92%).
     - **GDPR / Ethical Hacking:** Zero-Password Storage Policy (100% Enforced).

2. **Trigger the Data Exports:**
   - Click **"Download CSV Telemetry"**: Show that a real `.csv` file downloads with timestamped events, dwell times, and zero sensitive passwords.
   - Click **"Print Audit Certification"**: Show the clean, print-formatted executive certificate.

3. **(Bonus Power Move) Run the Python Companion Script in Terminal:**
   - Switch to your terminal and run:
     ```bash
     .venv\Scripts\python scripts\evaluate_stats.py
     ```
   - Show the terminal output computing the Chi-Square contingency table, p-value ($< 0.001$), and odds ratio ($0.183$).
   - Conclude:
     > *"This concludes our demonstration of the Social Engineering Countermeasures and Security Culture Assessment Platform. We welcome any questions from the evaluators."*

---

## 💡 Anticipated Examiner Questions & Winning Answers

### Q1: "How do you prove that employees improved due to your countermeasures and not random chance?"
> **Answer:** *"We implemented a randomized A/B cohort test across 124 simulation interactions. Cohort A received active countermeasures (warning banners and teachable moments) while Cohort B served as the baseline control. Cohort A achieved a 5.8% failure rate compared to 26.6% in Cohort B (a 78.2% relative risk reduction). Our Chi-Square test yielded $\chi^2 = 9.54$ with $p < 0.001$ and an Odds Ratio of $0.183$, confirming statistical significance at the 99.9% confidence interval."*

### Q2: "What is your ethical stance on storing passwords submitted on fake phishing pages?"
> **Answer:** *"We enforce a strict Zero-Credential Storage Policy in compliance with ethical hacking standards and GDPR Article 25 (Privacy by Design). When a user submits credentials on a simulated landing page, our API immediately discards the password string in memory. We record only boolean flags (`hasSubmitted: true`, `dwell_time_seconds`) and immediately launch an educational Teachable Moment."*

### Q3: "What is the difference between Security Awareness and Security Culture?"
> **Answer:** *"Awareness is purely cognitive knowledge—knowing that phishing exists. Culture is what people actually do in practice when under pressure, especially when nobody is watching. That is why our 5-dimensional framework measures not just Cognition, but also Attitudes, Behaviors, Compliance, and crucially, Reporting Confidence (the psychological safety to report errors without fear of reprimand)."*

### Q4: "How does the platform handle different risk profiles across departments?"
> **Answer:** *"Different departments have distinct psychological vulnerabilities. In our Department Matrix, Finance has an Authority Bias of 82%, making them vulnerable to CEO fraud. Marketing has an Urgency Susceptibility of 81%, making them click deadline-driven lures. The platform dynamically prescribes tailored interventions—such as dual-authorization wire drills for Finance and urgency resistance workshops for Marketing."*
