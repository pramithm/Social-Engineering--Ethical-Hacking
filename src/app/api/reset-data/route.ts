import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST() {
  try {
    // Run prisma seed
    await execPromise("npx tsx prisma/seed.ts");
    return NextResponse.json({ success: true, message: "Database re-seeded successfully" });
  } catch (error) {
    console.error("Re-seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to re-seed database" }, { status: 500 });
  }
}
