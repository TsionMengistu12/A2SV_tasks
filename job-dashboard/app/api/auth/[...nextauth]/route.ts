import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import api from "@/lib/axiosInstance";

const providers: NextAuthOptions["providers"] = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            try {
                const res = await api.post<{ accessToken?: string }>(
                    "/login",
                    {
                        email: credentials?.email,
                        password: credentials?.password,
                    }
                );
                const user = res.data;
                if (user?.accessToken) {
                    return {
                        id: credentials?.email || "unknown",
                        email: credentials?.email,
                        accessToken: user.accessToken,
                    } as any;
                }
                return null;
            } catch (error) {
                console.error("Credentials login error", error);
                return null;
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
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



