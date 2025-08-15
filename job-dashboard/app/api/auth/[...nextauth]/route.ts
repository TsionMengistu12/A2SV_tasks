import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import api from "@/lib/axiosInstance";

function extractToken(payload: any): string | undefined {
    if (!payload) return undefined;
    // common shapes: { accessToken }, { token }, { data: { token } }, { data: { accessToken } }, snake_case
    return (
        payload.accessToken ||
        payload.token ||
        payload.access_token ||
        payload?.data?.accessToken ||
        payload?.data?.token ||
        payload?.data?.access_token ||

        payload?.user?.token ||
        payload?.user?.accessToken ||
        payload?.data?.user?.token ||
        payload?.data?.user?.accessToken ||
        undefined
    );
}

function extractUser(payload: any): { id?: string; email?: string; name?: string } {
    const user = payload?.user || payload?.data?.user || payload;
    return {
        id: user?._id || user?.id || undefined,
        email: user?.email || undefined,
        name: user?.name || undefined,
    };
}

const providers: NextAuthOptions["providers"] = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
            }
            try {
                const res = await api.post("/login", {
                    email: credentials.email,
                    password: credentials.password,
                });
                const data: any = res.data;
                const accessToken = extractToken(data);
                if (!accessToken) {
                    throw new Error("Login failed: no token returned by server");
                }
                const { id, email, name } = extractUser(data);
                return {
                    id: id || credentials.email, // must include an id
                    email: email || credentials.email,
                    name: name || undefined,
                    accessToken,
                } as any;
            } catch (error: any) {
                // Surface backend error message if present
                const backendMessage = error?.response?.data?.message || error?.message;
                throw new Error(backendMessage || "Authentication failed");
            }
        },
    }),
];

// Only add Google if credentials exist to avoid runtime errors
if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    );
}

export const authOptions: NextAuthOptions = {
    providers,
    pages: {
        signIn: "/auth/sign_in",
        error: "/auth/sign_in",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user && (user as any).accessToken) {
                token.accessToken = (user as any).accessToken;
            }
            if (account?.provider === "google" && account.access_token) {
                token.accessToken = account.access_token as string;
            }
            return token as any;
        },
        async session({ session, token }) {
            (session as any).accessToken =
                typeof (token as any).accessToken === "string"
                    ? ((token as any).accessToken as string)
                    : undefined;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-change-me",
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



