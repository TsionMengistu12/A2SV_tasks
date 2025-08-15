import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import api from "@/lib/axiosInstance";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions as any);
    const accessToken = (session as any)?.accessToken as string | undefined;
    if (!session || !accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Job id is required" }, { status: 400 });
    }

    try {
        const res = await api.post(
            `/bookmarks/${id}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return NextResponse.json(res.data ?? { success: true, bookmarked: true });
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        const message = error?.response?.data?.message || error?.message || "Bookmark failed";
        return NextResponse.json({ message }, { status });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions as any);
    const accessToken = (session as any)?.accessToken as string | undefined;
    if (!session || !accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Job id is required" }, { status: 400 });
    }

    try {
        const res = await api.delete(`/bookmarks/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return NextResponse.json(res.data ?? { success: true, bookmarked: false });
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        const message = error?.response?.data?.message || error?.message || "Unbookmark failed";
        return NextResponse.json({ message }, { status });
    }
}


