import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const cookieStore = await cookies();
    const isE2EBypass = cookieStore.get("e2e-auth")?.value === "1";

    const session = await getServerSession(authOptions as any);
    const accessToken = (session as any)?.accessToken as string | undefined;
    if (!isE2EBypass && (!session || !accessToken)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Job id is required" }, { status: 400 });
    }

    try {
        if (isE2EBypass) {
            return NextResponse.json({ success: true, bookmarked: true });
        }
        const res = await api.post(
            `/bookmarks/${id}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return NextResponse.json(res.data ?? { success: true, bookmarked: true });
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        // Treat 409 (already bookmarked) as success
        if (status === 409) {
            return NextResponse.json({ success: true, bookmarked: true });
        }
        const message = error?.response?.data?.message || error?.message || "Bookmark failed";
        return NextResponse.json({ message }, { status });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const cookieStore = await cookies();
    const isE2EBypass = cookieStore.get("e2e-auth")?.value === "1";

    const session = await getServerSession(authOptions as any);
    const accessToken = (session as any)?.accessToken as string | undefined;
    if (!isE2EBypass && (!session || !accessToken)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Job id is required" }, { status: 400 });
    }

    try {
        if (isE2EBypass) {
            return NextResponse.json({ success: true, bookmarked: false });
        }
        const res = await api.delete(`/bookmarks/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return NextResponse.json(res.data ?? { success: true, bookmarked: false });
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        // Treat 404 (not bookmarked) as success
        if (status === 404) {
            return NextResponse.json({ success: true, bookmarked: false });
        }
        const message = error?.response?.data?.message || error?.message || "Unbookmark failed";
        return NextResponse.json({ message }, { status });
    }
}


