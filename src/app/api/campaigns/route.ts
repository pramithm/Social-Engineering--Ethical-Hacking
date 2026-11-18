import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        countermeasure: true,
        _count: {
          select: { events: true },
        },
      },
    });

    const parsedCampaigns = campaigns.map((c) => {
      let redFlagsList: string[] = [];
      try {
        redFlagsList = JSON.parse(c.redFlags);
      } catch {
        redFlagsList = [c.redFlags];
      }

      const clickRate = c.targetCount > 0 ? (c.clickCount / c.targetCount) * 100 : 0;
      const submitRate = c.targetCount > 0 ? (c.submitCount / c.targetCount) * 100 : 0;
      const reportRate = c.targetCount > 0 ? (c.reportCount / c.targetCount) * 100 : 0;

      return {
        ...c,
        redFlagsList,
        clickRate: Math.round(clickRate * 10) / 10,
        submitRate: Math.round(submitRate * 10) / 10,
        reportRate: Math.round(reportRate * 10) / 10,
      };
    });

    return NextResponse.json({ success: true, campaigns: parsedCampaigns });
  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      vectorType,
      difficulty = "MEDIUM",
      targetDepartment = "All Departments",
      targetCount = 20,
      countermeasureId,
      hasABTest = true,
      emailSubject,
      senderName,
      senderEmail,
      emailBodyHtml,
      landingPageHtml,
      redFlags,
    } = body;

    if (!name || !vectorType || !emailSubject) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, vectorType, emailSubject)" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description: description || `Simulated ${vectorType.toLowerCase().replace(/_/g, " ")} exercise.`,
        vectorType,
        difficulty,
        status: "ACTIVE",
        targetDepartment,
        targetCount: Number(targetCount) || 20,
        countermeasureId: countermeasureId || null,
        hasABTest: Boolean(hasABTest),
        controlGroupRate: 28.0,
        testGroupRate: 6.5,
        emailSubject,
        senderName: senderName || "Security Gateway Notification",
        senderEmail: senderEmail || "security-alerts@internal-verify.net",
        emailBodyHtml:
          emailBodyHtml ||
          `<p>This is a priority notification regarding your corporate account.</p><p><a href="#demo-link" style="color:#2563EB;font-weight:600;">Click here to review credentials</a></p>`,
        landingPageHtml:
          landingPageHtml ||
          `<!DOCTYPE html><html><body><h2>Authentication Verification Gateway</h2></body></html>`,
        redFlags: Array.isArray(redFlags) ? JSON.stringify(redFlags) : JSON.stringify([
          "Lookalike external domain",
          "Urgency cue forcing quick interaction",
          "Unsolicited authentication prompt"
        ]),
      },
    });

    // Record system audit log
    await prisma.systemAuditLog.create({
      data: {
        action: "CAMPAIGN_CREATED",
        actor: "Simulation Engineer (Member 1)",
        module: "MODULE_1_SIMULATION",
        details: `Created new campaign "${name}" targeting ${targetDepartment} with vector ${vectorType}.`,
        severity: "INFO",
      },
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json({ success: false, error: "Failed to create campaign" }, { status: 500 });
  }
}
