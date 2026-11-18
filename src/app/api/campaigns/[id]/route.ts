import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
      include: {
        countermeasure: true,
        events: {
          orderBy: { createdAt: "desc" },
          take: 50,
          include: {
            user: { select: { name: true, email: true, role: true, department: { select: { name: true } } } },
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ success: false, error: "Campaign not found" }, { status: 404 });
    }

    let redFlagsList: string[] = [];
    try {
      redFlagsList = JSON.parse(campaign.redFlags);
    } catch {
      redFlagsList = [campaign.redFlags];
    }

    return NextResponse.json({
      success: true,
      campaign: {
        ...campaign,
        redFlagsList,
      },
    });
  } catch (error) {
    console.error("Get campaign details error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch campaign details" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.campaign.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    console.error("Delete campaign error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete campaign" }, { status: 500 });
  }
}
