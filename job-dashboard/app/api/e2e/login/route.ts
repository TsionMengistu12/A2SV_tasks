import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });
    res.cookies.set("e2e-auth", "1", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
    });
    return res;
}


