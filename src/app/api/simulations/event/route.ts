import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      campaignId,
      userId,
      eventType, // "CLICKED", "SUBMITTED", "REPORTED"
      timeToInteractSeconds = 12,
      countermeasureApplied = false,
      countermeasureType = "NONE",
      userAgent = "Mozilla/5.0 Simulation-Client",
      // CRITICAL ETHICAL GUARDRAIL: We explicitly accept but DISCARD any credential strings
      // We NEVER save passwords!
      passwordDiscarded = true,
      notes,
    } = body;

    if (!campaignId || !eventType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (campaignId, eventType)" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json({ success: false, error: "Campaign not found" }, { status: 404 });
    }

    // Determine safe telemetry detail text based on event type
    let safeDetail = notes || "";
    if (eventType === "CLICKED") {
      safeDetail = countermeasureApplied
        ? "Target clicked phishing link. Contextual warning banner was displayed."
        : "Target clicked phishing link in unmonitored baseline mode.";
    } else if (eventType === "SUBMITTED") {
      safeDetail = "Target attempted credential submission. [ETHICAL GUARDRAIL ENFORCED: Password payload discarded. Boolean interaction logged.]";
    } else if (eventType === "REPORTED") {
      safeDetail = `Target actively reported phishing lure via One-Click Phish Alert in ${timeToInteractSeconds} seconds.`;
    }

    // Create simulation event
    const event = await prisma.simulationEvent.create({
      data: {
        campaignId,
        userId: userId || null,
        token: `tok_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        eventType,
        timeToInteractSeconds: Number(timeToInteractSeconds) || 0,
        countermeasureApplied: Boolean(countermeasureApplied),
        countermeasureType: countermeasureType || (countermeasureApplied ? "ACTIVE_COUNTERMEASURE" : "NONE"),
        ipAddress: "127.0.0.1",
        userAgent,
        details: safeDetail,
      },
    });

    // Update campaign metrics
    const updateData: {
      clickCount?: { increment: number };
      submitCount?: { increment: number };
      reportCount?: { increment: number };
      avgTimeToReportSeconds?: number;
    } = {};

    if (eventType === "CLICKED") {
      updateData.clickCount = { increment: 1 };
    } else if (eventType === "SUBMITTED") {
      updateData.submitCount = { increment: 1 };
    } else if (eventType === "REPORTED") {
      updateData.reportCount = { increment: 1 };
      // update average time to report
      const currentAvg = campaign.avgTimeToReportSeconds || 120;
      const count = campaign.reportCount || 1;
      updateData.avgTimeToReportSeconds = Math.round(((currentAvg * count + Number(timeToInteractSeconds)) / (count + 1)) * 10) / 10;
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: updateData,
    });

    // Update user stats if a user was targeted
    if (userId) {
      const userUpdate: {
        phishingSimulationsCount?: { increment: number };
        phishingFailuresCount?: { increment: number };
        phishingReportsCount?: { increment: number };
        lastSimulationDate?: Date;
      } = {
        lastSimulationDate: new Date(),
      };

      if (eventType === "SUBMITTED") {
        userUpdate.phishingFailuresCount = { increment: 1 };
      } else if (eventType === "REPORTED") {
        userUpdate.phishingReportsCount = { increment: 1 };
      }

      await prisma.user.update({
        where: { id: userId },
        data: userUpdate,
      });
    }

    // Create audit log for reporting or credential submission
    if (eventType === "SUBMITTED" || eventType === "REPORTED") {
      await prisma.systemAuditLog.create({
        data: {
          action: eventType === "SUBMITTED" ? "SIMULATION_FAILURE_LOGGED" : "SIMULATION_REPORT_REGISTERED",
          actor: "Telemetry Engine (Member 1)",
          module: "MODULE_1_SIMULATION",
          details: `Event ${eventType} recorded for campaign "${campaign.name}". Safe telemetry captured.`,
          severity: eventType === "SUBMITTED" ? "POLICY_ENFORCED" : "INFO",
        },
      });
    }

    return NextResponse.json({
      success: true,
      event,
      updatedCampaignStats: {
        clickCount: updatedCampaign.clickCount,
        submitCount: updatedCampaign.submitCount,
        reportCount: updatedCampaign.reportCount,
      },
    });
  } catch (error) {
    console.error("Simulation event error:", error);
    return NextResponse.json({ success: false, error: "Failed to log simulation event" }, { status: 500 });
  }
}
