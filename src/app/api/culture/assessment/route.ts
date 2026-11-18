import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateHRS } from "@/lib/risk-calculator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      departmentId,
      userId,
      respondentRole = "Staff Member",
      answers, // { q1: 5, q2: 4, q3: 5, q4: 5, q5: 4, q6: 5, q7: 4, q8: 5 }
    } = body;

    if (!departmentId || !answers) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (departmentId, answers)" },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 });
    }

    // Map 8 questions to the 5 dimensions:
    // Attitudes: (q1 + q2) / 2
    // Behaviors: (q3 + q4) / 2
    // Cognition: (q5 + q6) / 2
    // Compliance: q7
    // Reporting Confidence (No Fear of Blame): q8
    const q1 = Number(answers.q1) || 3;
    const q2 = Number(answers.q2) || 3;
    const q3 = Number(answers.q3) || 3;
    const q4 = Number(answers.q4) || 3;
    const q5 = Number(answers.q5) || 3;
    const q6 = Number(answers.q6) || 3;
    const q7 = Number(answers.q7) || 3;
    const q8 = Number(answers.q8) || 3;

    const attitudesScore = Math.round((((q1 + q2) / 10) * 100) * 10) / 10;
    const behaviorsScore = Math.round((((q3 + q4) / 10) * 100) * 10) / 10;
    const cognitionScore = Math.round((((q5 + q6) / 10) * 100) * 10) / 10;
    const complianceScore = Math.round(((q7 / 5) * 100) * 10) / 10;
    const reportingScore = Math.round(((q8 / 5) * 100) * 10) / 10;

    const overallScore =
      Math.round(
        ((attitudesScore + behaviorsScore + cognitionScore + complianceScore + reportingScore) / 5) * 10
      ) / 10;

    // Create the assessment record
    const assessment = await prisma.cultureAssessment.create({
      data: {
        departmentId,
        userId: userId || null,
        overallScore,
        attitudesScore,
        behaviorsScore,
        cognitionScore,
        complianceScore,
        reportingConfidenceScore: reportingScore,
        respondentRole,
        answersJson: JSON.stringify(answers),
      },
    });

    // Recalculate Department's aggregate culture score
    const allDeptAssessments = await prisma.cultureAssessment.findMany({
      where: { departmentId },
    });

    const newDeptCultureScore =
      allDeptAssessments.reduce((sum, a) => sum + a.overallScore, 0) / (allDeptAssessments.length || 1);
    const roundedDeptCulture = Math.round(newDeptCultureScore * 10) / 10;

    // Recalculate Department's Human Risk Score (HRS)
    const newHRS = calculateHRS(
      department.failureRate,
      roundedDeptCulture,
      department.avgDwellTimeSeconds
    );

    // Update department in database
    const updatedDepartment = await prisma.department.update({
      where: { id: departmentId },
      data: {
        cultureScore: roundedDeptCulture,
        riskScore: newHRS.compositeScore,
      },
    });

    // Record audit log
    await prisma.systemAuditLog.create({
      data: {
        action: "LIVE_ASSESSMENT_COMPLETED",
        actor: `${respondentRole} (${department.code})`,
        module: "MODULE_3_CULTURE",
        details: `Completed psychometric culture assessment. Score: ${overallScore}/100. Updated ${department.name} HRS to ${newHRS.compositeScore}.`,
        severity: "INFO",
      },
    });

    return NextResponse.json({
      success: true,
      assessment,
      updatedDepartment: {
        id: updatedDepartment.id,
        name: updatedDepartment.name,
        cultureScore: updatedDepartment.cultureScore,
        riskScore: updatedDepartment.riskScore,
        riskTier: newHRS.riskTier,
        riskColor: newHRS.riskColor,
      },
      dimensionBreakdown: {
        attitudes: attitudesScore,
        behaviors: behaviorsScore,
        cognition: cognitionScore,
        compliance: complianceScore,
        reportingConfidence: reportingScore,
      },
    });
  } catch (error) {
    console.error("Assessment submit error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit assessment" }, { status: 500 });
  }
}
