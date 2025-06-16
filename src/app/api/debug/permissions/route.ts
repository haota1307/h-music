import { NextRequest, NextResponse } from "next/server";
import { getUserPermissions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "User ID is required",
      });
    }

    console.log("Testing getUserPermissions for:", userId);

    const permissions = await getUserPermissions(userId);

    console.log("getUserPermissions result:", {
      userId,
      permissionsCount: permissions.length,
      permissions,
    });

    return NextResponse.json({
      success: true,
      permissions,
      count: permissions.length,
      userId,
    });
  } catch (error) {
    console.error("Error testing getUserPermissions:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
