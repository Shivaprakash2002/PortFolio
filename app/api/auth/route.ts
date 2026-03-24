import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth
 * Validates admin credentials stored in environment variables.
 * Returns { ok: true } on success, 401 on failure.
 */
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return NextResponse.json(
      { error: "Admin credentials not configured." },
      { status: 500 }
    );
  }

  if (username === validUser && password === validPass) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Invalid username or password." },
    { status: 401 }
  );
}
