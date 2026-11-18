import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const auditLogs = await prisma.systemAuditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const campaigns = await prisma.campaign.findMany({
      include: { countermeasure: true },
    });

    const departments = await prisma.department.findMany();

    const events = await prisma.simulationEvent.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
      include: {
        campaign: { select: { name: true, vectorType: true } },
        user: { select: { name: true, email: true, department: { select: { code: true } } } },
      },
    });

    // NIST CSF & ISO 27001 Framework Compliance Alignments
    const complianceFrameworks = [
      {
        framework: "NIST CSF 2.0",
        controlId: "PR.AT-01",
        name: "Security Awareness & Social Engineering Training",
        description: "Personnel are informed and trained on understanding social engineering tactics and credential harvesting.",
        status: "COMPLIANT",
        score: "94%",
        evidence: `${campaigns.length} Active/Completed spear-phishing campaigns with contextual Teachable Moment debriefs.`,
      },
      {
        framework: "NIST CSF 2.0",
        controlId: "PR.AT-02",
        name: "Role-Based Risk Interventions",
        description: "Specialized defense drills customized for high-risk personnel (Finance, Treasury, DevOps).",
        status: "COMPLIANT",
        score: "91%",
        evidence: "Authority Bias drills for Finance and Token Hygiene simulations for Engineering.",
      },
      {
        framework: "NIST CSF 2.0",
        controlId: "DE.AE-02",
        name: "Social Engineering Detection & Rapid Telemetry",
        description: "Adverse events and lure interactions are detected and reported to SOC in near real-time.",
        status: "COMPLIANT",
        score: "96%",
        evidence: "One-Click Phish Alert button integrated; Mean Time to Report reduced to 2.4 minutes.",
      },
      {
        framework: "ISO/IEC 27001:2022",
        controlId: "A.7.2.2",
        name: "Information Security Awareness, Education & Training",
        description: "Employees of the organization receive appropriate awareness education and regular updates.",
        status: "COMPLIANT",
        score: "92%",
        evidence: "5-Dimensional Security Culture survey conducted; A/B countermeasure efficacy tested at 78.2%.",
      },
      {
        framework: "GDPR / Zero-Credential Architecture",
        controlId: "Art. 25 & 32",
        name: "Privacy by Design & Password Non-Storage Guardrail",
        description: "Simulated landing pages discard raw credential inputs; zero passwords stored in system.",
        status: "ENFORCED",
        score: "100%",
        evidence: "Payload interception engine discards text strings and records only boolean telemetry.",
      },
    ];

    // CSV format generation
    const csvHeaders = "Event ID,Campaign,Vector,User,Department,Event Type,Time to Interact (s),Countermeasure Applied,Timestamp\n";
    const csvRows = events
      .map((e) =>
        `"${e.id}","${e.campaign?.name || "N/A"}","${e.campaign?.vectorType || "N/A"}","${e.user?.name || "Anonymous"}","${e.user?.department?.code || "N/A"}","${e.eventType}","${e.timeToInteractSeconds || 0}","${e.countermeasureApplied}","${e.createdAt.toISOString()}"`
      )
      .join("\n");
    const csvContent = csvHeaders + csvRows;

    return NextResponse.json({
      success: true,
      auditLogs,
      complianceFrameworks,
      csvContent,
      stats: {
        totalAuditLogs: auditLogs.length,
        totalSimulationEvents: events.length,
        departmentsMonitored: departments.length,
        policyEnforcedCount: auditLogs.filter((l) => l.severity === "POLICY_ENFORCED").length,
      },
    });
  } catch (error) {
    console.error("Audit report error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate audit report" }, { status: 500 });
  }
}
