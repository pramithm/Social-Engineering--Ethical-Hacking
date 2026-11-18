import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Cleaning existing database records...");
  await prisma.systemAuditLog.deleteMany();
  await prisma.simulationEvent.deleteMany();
  await prisma.cultureAssessment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.countermeasure.deleteMany();
  await prisma.department.deleteMany();

  console.log("🏢 Seeding Enterprise Departments...");
  const deptEngineering = await prisma.department.create({
    data: {
      name: "Engineering",
      code: "ENG",
      description: "Software developers, DevOps, and cloud infrastructure engineers.",
      riskScore: 24.5,
      cultureScore: 82.0,
      failureRate: 8.5,
      reportRate: 84.0,
      avgDwellTimeSeconds: 88.0,
      authorityBiasScore: 22.0,
      urgencySusceptibility: 28.0,
      recommendedIntervention: "Advanced Spear-Phishing & Developer Token Hygiene Micro-Training",
    },
  });

  const deptFinance = await prisma.department.create({
    data: {
      name: "Finance",
      code: "FIN",
      description: "Accounting, payroll, procurement, and treasury management.",
      riskScore: 68.4,
      cultureScore: 58.5,
      failureRate: 28.6,
      reportRate: 48.0,
      avgDwellTimeSeconds: 215.0,
      authorityBiasScore: 82.0, // High Authority Bias!
      urgencySusceptibility: 74.0,
      recommendedIntervention: "Executive Impersonation (CEO Fraud) & Dual-Authorization Protocol Drills",
    },
  });

  const deptMarketing = await prisma.department.create({
    data: {
      name: "Marketing",
      code: "MKT",
      description: "Brand, content creation, social media, and digital advertising.",
      riskScore: 54.2,
      cultureScore: 64.0,
      failureRate: 22.0,
      reportRate: 58.5,
      avgDwellTimeSeconds: 165.0,
      authorityBiasScore: 48.0,
      urgencySusceptibility: 81.0, // High Urgency Susceptibility!
      recommendedIntervention: "Urgency Resistance & Malicious External Asset Verification Workshops",
    },
  });

  const deptHR = await prisma.department.create({
    data: {
      name: "Human Resources",
      code: "HR",
      description: "Talent acquisition, employee relations, payroll support, and compliance.",
      riskScore: 42.0,
      cultureScore: 71.5,
      failureRate: 15.5,
      reportRate: 72.0,
      avgDwellTimeSeconds: 130.0,
      authorityBiasScore: 56.0,
      urgencySusceptibility: 51.0,
      recommendedIntervention: "Resume Payload & Document Macro Inspection Countermeasures",
    },
  });

  const deptOperations = await prisma.department.create({
    data: {
      name: "Operations",
      code: "OPS",
      description: "Supply chain, facilities, vendor relations, and business logistics.",
      riskScore: 47.8,
      cultureScore: 68.0,
      failureRate: 18.2,
      reportRate: 64.0,
      avgDwellTimeSeconds: 150.0,
      authorityBiasScore: 61.0,
      urgencySusceptibility: 59.0,
      recommendedIntervention: "Vendor Email Compromise (VEC) & Invoice Verification Simulations",
    },
  });

  console.log("🛡️ Seeding Countermeasures & A/B Cohorts...");
  const cmBanner = await prisma.countermeasure.create({
    data: {
      name: "External Sender Warning Banners",
      type: "WARNING_BANNER",
      description: "Contextual high-contrast banner inserted at the top of emails originating outside the corporate gateway, alerting users to unverified sender domains.",
      bannerText: "CAUTION: This email originated outside our organization. Do not click links or open attachments unless you recognize the sender and know the content is safe.",
      bannerSeverity: "WARNING",
      isActive: true,
      efficacyRate: 74.7,
      controlFailureRate: 28.5,
      testFailureRate: 7.2,
    },
  });

  const cmTeachable = await prisma.countermeasure.create({
    data: {
      name: "Zero-Delay Teachable Moment Overlay",
      type: "TEACHABLE_MOMENT",
      description: "Immediate educational debrief triggered instantly upon clicking a simulation lure. Deconstructs the visual and psychological red flags without penalizing the employee.",
      bannerSeverity: "DANGER",
      isActive: true,
      efficacyRate: 80.3,
      controlFailureRate: 31.0,
      testFailureRate: 6.1,
    },
  });

  const cmMicroTraining = await prisma.countermeasure.create({
    data: {
      name: "2-Minute Interactive Red-Flag Micro-Training",
      type: "MICRO_TRAINING",
      description: "Gamified bite-sized 3-question module that walks employees through URL inspection, header analysis, and psychological urgency cues.",
      isActive: true,
      efficacyRate: 78.2,
      controlFailureRate: 24.8,
      testFailureRate: 5.4,
      trainingModuleJson: JSON.stringify([
        {
          id: 1,
          question: "Inspect this sender address: 'support@paypaI-security.com'. What is the critical red flag?",
          options: [
            "The domain uses an uppercase 'I' to mimic a lowercase 'l' (Homoglyph Attack).",
            "The email uses standard SSL encryption.",
            "PayPal always uses port 443.",
            "The subject line is written in English.",
          ],
          correctIndex: 0,
          explanation: "Attackers often use lookalike characters (typosquatting or homoglyphs) such as replacing 'l' with 'I' to impersonate legitimate domains.",
        },
        {
          id: 2,
          question: "An email claims: 'Your payroll direct deposit will be suspended within 60 minutes unless verified'. What psychological lever is being exploited?",
          options: [
            "Curiosity and flattery",
            "Artificial Urgency and Loss Aversion",
            "Reciprocity",
            "Consensus / Social Proof",
          ],
          correctIndex: 1,
          explanation: "Artificial urgency induces cognitive panic, bypassing critical rational thinking so victims rush into clicking without checking authenticity.",
        },
        {
          id: 3,
          question: "When in doubt about a sensitive wire transfer request purportedly from your CEO, what is the best ethical procedure?",
          options: [
            "Reply directly to the email asking if it is genuine.",
            "Forward the email to your personal account.",
            "Verify via an independent, out-of-band communication channel (e.g., call or corporate chat) and report with the Phish Alert button.",
            "Process the wire if the amount is below $5,000.",
          ],
          correctIndex: 2,
          explanation: "Never verify suspicious requests via the same channel. Always use a known secondary channel (out-of-band) to confirm sensitive transactions.",
        },
      ]),
    },
  });

  const cmReportButton = await prisma.countermeasure.create({
    data: {
      name: "One-Click Phish Alert Button",
      type: "REPORT_BUTTON",
      description: "Direct email client integration allowing one-click incident reporting, feeding immediate SOC telemetry and removing malicious emails from mailboxes.",
      isActive: true,
      efficacyRate: 79.5,
      controlFailureRate: 22.0,
      testFailureRate: 4.5,
    },
  });

  console.log("👥 Seeding 28 Realistic Enterprise Users...");
  const usersData = [
    // Engineering
    { name: "Alex Mercer", email: "alex.mercer@enterprise.internal", role: "Principal Architect", dept: deptEngineering, risk: 18.0, sims: 6, fails: 0, reps: 6 },
    { name: "Maya Lin", email: "maya.lin@enterprise.internal", role: "Senior DevOps Engineer", dept: deptEngineering, risk: 22.0, sims: 5, fails: 1, reps: 4 },
    { name: "Devon Vance", email: "devon.vance@enterprise.internal", role: "Backend Developer", dept: deptEngineering, risk: 25.0, sims: 4, fails: 0, reps: 4 },
    { name: "Sophia Patel", email: "sophia.patel@enterprise.internal", role: "Frontend Engineer", dept: deptEngineering, risk: 30.0, sims: 5, fails: 1, reps: 3 },
    { name: "Lucas Wright", email: "lucas.wright@enterprise.internal", role: "QA Automation Lead", dept: deptEngineering, risk: 24.0, sims: 4, fails: 0, reps: 4 },
    { name: "Elena Rostova", email: "elena.rostova@enterprise.internal", role: "Cloud Security Specialist", dept: deptEngineering, risk: 12.0, sims: 6, fails: 0, reps: 6 },

    // Finance
    { name: "Sarah Miller", email: "sarah.miller@enterprise.internal", role: "Senior Financial Analyst", dept: deptFinance, risk: 72.0, sims: 6, fails: 3, reps: 2 },
    { name: "Robert Sterling", email: "robert.sterling@enterprise.internal", role: "Treasury Manager", dept: deptFinance, risk: 78.5, sims: 5, fails: 3, reps: 1 },
    { name: "Chloe Bennett", email: "chloe.bennett@enterprise.internal", role: "Accounts Payable Clerk", dept: deptFinance, risk: 65.0, sims: 4, fails: 2, reps: 1 },
    { name: "Marcus Thorne", email: "marcus.thorne@enterprise.internal", role: "Chief Financial Controller", dept: deptFinance, risk: 58.0, sims: 5, fails: 1, reps: 3 },
    { name: "Priya Sharma", email: "priya.sharma@enterprise.internal", role: "Payroll Administrator", dept: deptFinance, risk: 69.0, sims: 6, fails: 2, reps: 2 },

    // Marketing
    { name: "Julian Hayes", email: "julian.hayes@enterprise.internal", role: "Digital Campaign Manager", dept: deptMarketing, risk: 58.0, sims: 5, fails: 2, reps: 2 },
    { name: "Emily Watson", email: "emily.watson@enterprise.internal", role: "Social Media Specialist", dept: deptMarketing, risk: 62.5, sims: 6, fails: 2, reps: 3 },
    { name: "Liam O'Connor", email: "liam.oconnor@enterprise.internal", role: "Brand Copywriter", dept: deptMarketing, risk: 48.0, sims: 4, fails: 1, reps: 2 },
    { name: "Zoe Kravitz", email: "zoe.kravitz@enterprise.internal", role: "SEO Growth Hacker", dept: deptMarketing, risk: 52.0, sims: 5, fails: 1, reps: 3 },
    { name: "Nathaniel Drake", email: "nathaniel.drake@enterprise.internal", role: "Creative Director", dept: deptMarketing, risk: 46.0, sims: 4, fails: 0, reps: 3 },

    // HR
    { name: "Hannah Abbott", email: "hannah.abbott@enterprise.internal", role: "HR Business Partner", dept: deptHR, risk: 38.0, sims: 5, fails: 1, reps: 4 },
    { name: "Carlos Mendez", email: "carlos.mendez@enterprise.internal", role: "Talent Acquisition Lead", dept: deptHR, risk: 45.0, sims: 6, fails: 2, reps: 3 },
    { name: "Olivia Kim", email: "olivia.kim@enterprise.internal", role: "People Operations Manager", dept: deptHR, risk: 36.0, sims: 5, fails: 0, reps: 4 },
    { name: "Derek Foster", email: "derek.foster@enterprise.internal", role: "Benefits Coordinator", dept: deptHR, risk: 49.0, sims: 4, fails: 1, reps: 2 },
    { name: "Fatima Al-Sayed", email: "fatima.alsayed@enterprise.internal", role: "HR Compliance Officer", dept: deptHR, risk: 32.0, sims: 6, fails: 0, reps: 5 },

    // Operations
    { name: "Travis Scott", email: "travis.scott@enterprise.internal", role: "Logistics Coordinator", dept: deptOperations, risk: 46.0, sims: 5, fails: 1, reps: 3 },
    { name: "Victoria Chang", email: "victoria.chang@enterprise.internal", role: "Procurement Specialist", dept: deptOperations, risk: 52.0, sims: 6, fails: 2, reps: 3 },
    { name: "Gabriel Silva", email: "gabriel.silva@enterprise.internal", role: "Facilities Director", dept: deptOperations, risk: 44.0, sims: 4, fails: 1, reps: 2 },
    { name: "Rachel Green", email: "rachel.green@enterprise.internal", role: "Supply Chain Analyst", dept: deptOperations, risk: 49.0, sims: 5, fails: 1, reps: 3 },
    { name: "Arthur Pendelton", email: "arthur.pendelton@enterprise.internal", role: "Vendor Risk Manager", dept: deptOperations, risk: 35.0, sims: 5, fails: 0, reps: 4 },
    { name: "Jordan Brooks", email: "jordan.brooks@enterprise.internal", role: "Operations Supervisor", dept: deptOperations, risk: 50.0, sims: 4, fails: 1, reps: 2 },
    { name: "Samantha Taylor", email: "samantha.taylor@enterprise.internal", role: "Inventory Lead", dept: deptOperations, risk: 42.0, sims: 4, fails: 0, reps: 3 },
  ];

  const createdUsers = [];
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        role: u.role,
        departmentId: u.dept.id,
        riskScore: u.risk,
        phishingSimulationsCount: u.sims,
        phishingFailuresCount: u.fails,
        phishingReportsCount: u.reps,
        lastSimulationDate: new Date(Date.now() - Math.floor(Math.random() * 14 * 86400000)),
      },
    });
    createdUsers.push(user);
  }

  console.log("🎯 Seeding Simulation Campaigns...");
  const campCEO = await prisma.campaign.create({
    data: {
      name: "Q4 Executive Authority Lure - CEO Urgent Wire",
      description: "Spear-phishing simulation impersonating Executive Leadership requesting confidential fund routing under NDA.",
      vectorType: "CEO_PRETEXTING",
      difficulty: "HIGH",
      status: "ACTIVE",
      targetDepartment: "Finance",
      targetCount: 18,
      clickCount: 6,
      submitCount: 4,
      reportCount: 11,
      avgTimeToReportSeconds: 142.0,
      countermeasureId: cmTeachable.id,
      hasABTest: true,
      controlGroupRate: 33.3,
      testGroupRate: 5.5,
      emailSubject: "CONFIDENTIAL: Urgent Wire Authorization - Q4 Asset Acquisition [Action Required Today]",
      senderName: "Richard Sterling (CEO)",
      senderEmail: "ceo-office@corp-exec-secure.com",
      emailBodyHtml: `<p>Hi Team,</p><p>We are finalizing a sensitive strategic acquisition that is currently under strict non-disclosure. I need immediate wire routing authorization for the retainer invoice attached below.</p><p>Due to the confidentiality of this transaction, do NOT discuss this with others until the public release on Friday.</p><p><a href="#demo-link" style="color:#2563EB;font-weight:600;text-decoration:underline;">Review & Approve Wire Authorization Docket #Q4-8849</a></p><p>Best regards,<br/><strong>Richard Sterling</strong><br/>Chief Executive Officer</p>`,
      landingPageHtml: `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px;text-align:center;"><h2>Corporate Executive Portal</h2><p>Please enter your single sign-on credentials to review the encrypted wire transaction.</p></body></html>`,
      redFlags: JSON.stringify([
        "External sender domain (@corp-exec-secure.com instead of legitimate domain)",
        "Artificial high urgency ('Action Required Today')",
        "Strict secrecy clause attempting to bypass internal approval channels",
        "Direct financial wire request without prior purchase order verification",
      ]),
    },
  });

  const campVPN = await prisma.campaign.create({
    data: {
      name: "IT Infrastructure Emergency SSL VPN Gateway Reset",
      description: "Credential harvesting simulation using simulated IT urgency regarding mandatory security certificate renewal.",
      vectorType: "IT_VPN_RESET",
      difficulty: "MEDIUM",
      status: "ACTIVE",
      targetDepartment: "Engineering",
      targetCount: 24,
      clickCount: 4,
      submitCount: 2,
      reportCount: 20,
      avgTimeToReportSeconds: 96.0,
      countermeasureId: cmBanner.id,
      hasABTest: true,
      controlGroupRate: 20.8,
      testGroupRate: 4.1,
      emailSubject: "ACTION REQUIRED: Corporate GlobalProtect VPN Gateway SSL Update",
      senderName: "IT Support Helpdesk",
      senderEmail: "servicedesk@internal-vpn-gateway-renew.net",
      emailBodyHtml: `<p>Dear Colleague,</p><p>The root SSL CA certificate on our primary VPN gateway expires at midnight. Remote workers who have not re-verified their hardware tokens will experience network termination.</p><p><a href="#demo-link" style="color:#2563EB;font-weight:600;text-decoration:underline;">Validate Remote Access Credentials & Update Profile</a></p><p>IT Security Operations</p>`,
      landingPageHtml: `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px;text-align:center;"><h2>GlobalProtect VPN Login Portal</h2><p>Provide your domain user ID and network token to renew SSL certificate.</p></body></html>`,
      redFlags: JSON.stringify([
        "Domain squatting (@internal-vpn-gateway-renew.net is external)",
        "Threat of service termination within a short time frame",
        "Generic greeting ('Dear Colleague') instead of personalized name",
        "Bypasses standard automated IT deployment channels",
      ]),
    },
  });

  const campM365 = await prisma.campaign.create({
    data: {
      name: "Microsoft 365 Shared Document Access Expiration",
      description: "Credential harvesting simulation disguised as a secure OneDrive/SharePoint document sharing notification.",
      vectorType: "CREDENTIAL_HARVESTING",
      difficulty: "MEDIUM",
      status: "COMPLETED",
      targetDepartment: "All Departments",
      targetCount: 40,
      clickCount: 9,
      submitCount: 5,
      reportCount: 28,
      avgTimeToReportSeconds: 168.0,
      countermeasureId: cmReportButton.id,
      hasABTest: true,
      controlGroupRate: 27.5,
      testGroupRate: 7.5,
      emailSubject: "Microsoft OneDrive: Annual Compensation Review Grid shared with you",
      senderName: "Microsoft SharePoint Notifications",
      senderEmail: "no-reply@sharepoint-cloud-sharepoint.org",
      emailBodyHtml: `<p>A secure spreadsheet has been shared with your corporate account: <strong>2026_Q4_Compensation_Review.xlsx</strong></p><p>This link will expire in 24 hours.</p><p><a href="#demo-link" style="background:#2563EB;color:#FFF;padding:10px 18px;text-decoration:none;border-radius:4px;display:inline-block;">Open Spreadsheet in Excel Online</a></p>`,
      landingPageHtml: `<!DOCTYPE html><html><body><h2>Microsoft 365 Sign In</h2></body></html>`,
      redFlags: JSON.stringify([
        "Lookalike domain .org instead of official microsoft.com",
        "Sensational financial hook ('Compensation Review')",
        "Generic sign-in button pointing to unverified hostname",
      ]),
    },
  });

  const campMFA = await prisma.campaign.create({
    data: {
      name: "Duo Security MFA Push Fatigue Alert",
      description: "Simulated MFA fatigue notification prompting employee to review anomalous push authentication requests.",
      vectorType: "FAKE_MFA_PROMPT",
      difficulty: "HIGH",
      status: "ACTIVE",
      targetDepartment: "Operations",
      targetCount: 22,
      clickCount: 5,
      submitCount: 3,
      reportCount: 16,
      avgTimeToReportSeconds: 110.0,
      countermeasureId: cmMicroTraining.id,
      hasABTest: true,
      controlGroupRate: 25.0,
      testGroupRate: 6.2,
      emailSubject: "Security Notice: Unusual Multi-Factor Authorization Request Detected from Frankfurt, DE",
      senderName: "MFA Identity Protection",
      senderEmail: "security-alerts@mfa-auth-verify.com",
      emailBodyHtml: `<p>An unrecognized device requested access to your Single Sign-On profile from Frankfurt, Germany. If this was not you, please immediately confirm your identity and revoke the token.</p><p><a href="#demo-link" style="color:#2563EB;font-weight:600;">Review Security Incident & Deny Access</a></p>`,
      landingPageHtml: `<!DOCTYPE html><html><body><h2>MFA Verification Gateway</h2></body></html>`,
      redFlags: JSON.stringify([
        "External domain for identity provider",
        "Reverse psychology leveraging fear of compromise to capture live credentials",
        "Unverified login portal",
      ]),
    },
  });

  const campHR = await prisma.campaign.create({
    data: {
      name: "Mandatory HR Policy Update & Code of Conduct Sign-Off",
      description: "HR policy sign-off simulation targeting human resources and administrative teams.",
      vectorType: "CREDENTIAL_HARVESTING",
      difficulty: "LOW",
      status: "COMPLETED",
      targetDepartment: "Human Resources",
      targetCount: 20,
      clickCount: 3,
      submitCount: 1,
      reportCount: 17,
      avgTimeToReportSeconds: 125.0,
      countermeasureId: cmTeachable.id,
      hasABTest: true,
      controlGroupRate: 18.0,
      testGroupRate: 4.0,
      emailSubject: "Mandatory: 2026 Employee Handbook & Workplace Policy Acknowledgement",
      senderName: "HR Compliance Portal",
      senderEmail: "hr-updates@corporate-handbook-policy.info",
      emailBodyHtml: `<p>All employees are required to review the updated 2026 Code of Conduct. Failure to submit acknowledgement by EOD may affect compliance standing.</p><p><a href="#demo-link" style="color:#2563EB;font-weight:600;">Read and Sign Policy Agreement</a></p>`,
      landingPageHtml: `<!DOCTYPE html><html><body><h2>Employee Portal Sign In</h2></body></html>`,
      redFlags: JSON.stringify([
        "Incongruous .info top-level domain",
        "Threat of disciplinary action for delayed signature",
        "External login form mimicking internal intranet",
      ]),
    },
  });

  console.log("📊 Seeding Simulation Telemetry Events...");
  const eventsToCreate = [
    { camp: campCEO, user: createdUsers[6], type: "SUBMITTED", time: 78, cm: false, det: "Clicked lure and submitted credentials without warning banner" },
    { camp: campCEO, user: createdUsers[7], type: "SUBMITTED", time: 92, cm: false, det: "Fell for CEO authority lure; dummy credentials logged (safe zero-storage)" },
    { camp: campCEO, user: createdUsers[8], type: "REPORTED", time: 134, cm: true, det: "Identified domain mismatch; reported via One-Click Phish Alert" },
    { camp: campCEO, user: createdUsers[9], type: "REPORTED", time: 85, cm: true, det: "Noticed authority pressure red flag; flagged to SOC" },
    { camp: campCEO, user: createdUsers[10], type: "CLICKED", time: 140, cm: true, det: "Clicked link; stopped by Teachable Moment banner before submitting" },

    { camp: campVPN, user: createdUsers[0], type: "REPORTED", time: 42, cm: true, det: "Senior engineer detected unauthorized domain within 42 seconds" },
    { camp: campVPN, user: createdUsers[1], type: "CLICKED", time: 89, cm: false, det: "DevOps engineer clicked during late-night shift" },
    { camp: campVPN, user: createdUsers[2], type: "REPORTED", time: 64, cm: true, det: "Inspected email headers and verified SPF/DKIM failure" },
    { camp: campVPN, user: createdUsers[3], type: "SUBMITTED", time: 112, cm: false, det: "Control group - entered mock credentials on landing page" },
    { camp: campVPN, user: createdUsers[4], type: "REPORTED", time: 73, cm: true, det: "Escalated to internal Slack #security channel" },

    { camp: campM365, user: createdUsers[11], type: "CLICKED", time: 180, cm: false, det: "Marketing manager clicked compensation lure" },
    { camp: campM365, user: createdUsers[12], type: "REPORTED", time: 120, cm: true, det: "Noticed deceptive URL parameter and reported" },
    { camp: campM365, user: createdUsers[16], type: "REPORTED", time: 95, cm: true, det: "HR partner flagged suspicious payroll sheet" },
    { camp: campM365, user: createdUsers[21], type: "SUBMITTED", time: 240, cm: false, det: "Submitted fake credentials on mock Microsoft page" },
    { camp: campM365, user: createdUsers[22], type: "REPORTED", time: 150, cm: true, det: "Used Phish Alert button in Outlook" },

    { camp: campMFA, user: createdUsers[23], type: "REPORTED", time: 65, cm: true, det: "Operations director recognized MFA fatigue lure" },
    { camp: campMFA, user: createdUsers[24], type: "SUBMITTED", time: 130, cm: false, det: "Fell for urgent notification without checking caller" },
    { camp: campMFA, user: createdUsers[25], type: "REPORTED", time: 88, cm: true, det: "Reported to SOC after viewing Warning Banner" },
  ];

  for (let i = 0; i < eventsToCreate.length; i++) {
    const e = eventsToCreate[i];
    await prisma.simulationEvent.create({
      data: {
        campaignId: e.camp.id,
        userId: e.user.id,
        token: `tok_sim_${Date.now()}_${i}_${Math.random().toString(36).substring(7)}`,
        eventType: e.type,
        timeToInteractSeconds: e.time,
        countermeasureApplied: e.cm,
        countermeasureType: e.cm ? "TEACHABLE_MOMENT" : "NONE",
        details: e.det,
      },
    });
  }

  console.log("🧠 Seeding Security Culture Assessments (5 Dimensions)...");
  const cultureData = [
    // Engineering
    { dept: deptEngineering, att: 86, beh: 84, cog: 88, comp: 80, rep: 90, role: "Senior Developer" },
    { dept: deptEngineering, att: 82, beh: 80, cog: 85, comp: 78, rep: 86, role: "DevOps Engineer" },
    { dept: deptEngineering, att: 78, beh: 75, cog: 82, comp: 74, rep: 80, role: "QA Engineer" },
    // Finance
    { dept: deptFinance, att: 54, beh: 52, cog: 60, comp: 68, rep: 48, role: "Financial Analyst" },
    { dept: deptFinance, att: 60, beh: 55, cog: 62, comp: 72, rep: 52, role: "Accountant" },
    { dept: deptFinance, att: 50, beh: 48, cog: 56, comp: 65, rep: 44, role: "Treasury Specialist" },
    // Marketing
    { dept: deptMarketing, att: 66, beh: 60, cog: 64, comp: 62, rep: 58, role: "Marketing Specialist" },
    { dept: deptMarketing, att: 68, beh: 64, cog: 66, comp: 65, rep: 62, role: "Content Creator" },
    // HR
    { dept: deptHR, att: 74, beh: 72, cog: 70, comp: 78, rep: 72, role: "Recruiter" },
    { dept: deptHR, att: 76, beh: 74, cog: 72, comp: 80, rep: 75, role: "HR Generalist" },
    // Operations
    { dept: deptOperations, att: 70, beh: 68, cog: 66, comp: 72, rep: 65, role: "Logistics Lead" },
    { dept: deptOperations, att: 68, beh: 65, cog: 64, comp: 70, rep: 62, role: "Procurement Agent" },
  ];

  for (const c of cultureData) {
    const overall = (c.att + c.beh + c.cog + c.comp + c.rep) / 5;
    await prisma.cultureAssessment.create({
      data: {
        departmentId: c.dept.id,
        overallScore: Math.round(overall * 10) / 10,
        attitudesScore: c.att,
        behaviorsScore: c.beh,
        cognitionScore: c.cog,
        complianceScore: c.comp,
        reportingConfidenceScore: c.rep,
        respondentRole: c.role,
        answersJson: JSON.stringify({
          q1: 4, q2: 5, q3: 4, q4: 4, q5: 4, q6: 5, q7: 4, q8: 5
        }),
      },
    });
  }

  console.log("📝 Seeding System Audit Logs...");
  const auditLogs = [
    {
      action: "CAMPAIGN_DISPATCHED",
      actor: "SecOps Lead (Member 1)",
      module: "MODULE_1_SIMULATION",
      details: "Dispatched Campaign 'Q4 Executive Authority Lure' to 18 targets across Finance. A/B Cohorts split 50/50.",
      severity: "SECURITY_AUDIT",
    },
    {
      action: "COUNTERMEASURE_EVALUATION",
      actor: "Countermeasure Architect (Member 2)",
      module: "MODULE_2_COUNTERMEASURES",
      details: "Calculated 78.2% relative risk reduction for Interactive Teachable Moment overlay compared to control cohort.",
      severity: "INFO",
    },
    {
      action: "CULTURE_DIAGNOSTIC_RUN",
      actor: "Culture Analyst (Member 3)",
      module: "MODULE_3_CULTURE",
      details: "Computed 5-dimensional psychometric scores. Identified Finance department authority bias anomaly (Score: 82.0).",
      severity: "SECURITY_AUDIT",
    },
    {
      action: "ZERO_CREDENTIAL_POLICY_ENFORCED",
      actor: "Privacy Guardrail Engine",
      module: "MODULE_1_SIMULATION",
      details: "Intercepted simulated login form submission. Password payload discarded immediately; logged boolean flag only.",
      severity: "POLICY_ENFORCED",
    },
    {
      action: "NIST_CSF_REPORT_GENERATED",
      actor: "Compliance Auditor",
      module: "MODULE_3_CULTURE",
      details: "Generated NIST PR.AT-1 / ISO 27001 awareness audit certification document for executive board review.",
      severity: "INFO",
    },
  ];

  for (const log of auditLogs) {
    await prisma.systemAuditLog.create({
      data: {
        action: log.action,
        actor: log.actor,
        module: log.module,
        details: log.details,
        severity: log.severity,
      },
    });
  }

  console.log("✅ Database seeded successfully with enterprise data!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
