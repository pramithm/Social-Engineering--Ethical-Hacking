import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateHRS } from "@/lib/risk-calculator";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        users: {
          orderBy: { riskScore: "desc" },
        },
        cultureAssessments: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
      orderBy: { riskScore: "desc" },
    });

    const enriched = departments.map((d) => {
      const hrsBreakdown = calculateHRS(d.failureRate, d.cultureScore, d.avgDwellTimeSeconds);

      return {
        ...d,
        hrsBreakdown,
        employeeCount: d.users.length,
      };
    });

    return NextResponse.json({ success: true, departments: enriched });
  } catch (error) {
    console.error("Departments API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch departments" }, { status: 500 });
  }
}
