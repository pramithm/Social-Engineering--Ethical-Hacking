import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assessments = await prisma.cultureAssessment.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: {
        department: { select: { id: true, name: true, code: true } },
        user: { select: { name: true, role: true } },
      },
    });

    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        cultureScore: true,
        riskScore: true,
      },
    });

    // Compute 5-dimensional organizational averages
    const allAssessments = await prisma.cultureAssessment.findMany();
    const count = allAssessments.length || 1;

    const avgAttitudes = allAssessments.reduce((sum, a) => sum + a.attitudesScore, 0) / count;
    const avgBehaviors = allAssessments.reduce((sum, a) => sum + a.behaviorsScore, 0) / count;
    const avgCognition = allAssessments.reduce((sum, a) => sum + a.cognitionScore, 0) / count;
    const avgCompliance = allAssessments.reduce((sum, a) => sum + a.complianceScore, 0) / count;
    const avgReporting = allAssessments.reduce((sum, a) => sum + a.reportingConfidenceScore, 0) / count;
    const orgOverallCulture = (avgAttitudes + avgBehaviors + avgCognition + avgCompliance + avgReporting) / 5;

    // Radar chart format
    const radarData = [
      { dimension: "Attitudes", score: Math.round(avgAttitudes * 10) / 10, benchmark: 70, fullMark: 100 },
      { dimension: "Behaviors", score: Math.round(avgBehaviors * 10) / 10, benchmark: 68, fullMark: 100 },
      { dimension: "Cognition", score: Math.round(avgCognition * 10) / 10, benchmark: 72, fullMark: 100 },
      { dimension: "Compliance", score: Math.round(avgCompliance * 10) / 10, benchmark: 75, fullMark: 100 },
      { dimension: "Reporting Confidence", score: Math.round(avgReporting * 10) / 10, benchmark: 65, fullMark: 100 },
    ];

    return NextResponse.json({
      success: true,
      orgOverallCulture: Math.round(orgOverallCulture * 10) / 10,
      totalAssessmentsCount: allAssessments.length,
      radarData,
      departments,
      recentAssessments: assessments,
    });
  } catch (error) {
    console.error("Culture API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch culture diagnostics" }, { status: 500 });
  }
}
