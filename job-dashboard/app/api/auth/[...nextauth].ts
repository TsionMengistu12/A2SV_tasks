// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import axios from "axios";
// import { config } from "@/lib/config";

// export default NextAuth({
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         try {
//           const res = await axios.post(`${config.api.baseURL}${config.api.endpoints.login}`, {
//             email: credentials.email,
//             password: credentials.password
//           });

//           const user = res.data;

//           // Must return an object with at least an id property
//           if (user && (user._id || user.id)) {
//             return {
//               id: user._id ?? user.id,
//               name: user.name ?? "",
//               email: user.email ?? "",
//               token: user.token ?? ""
//             };
//           }

//           throw new Error("Invalid user data received");

//         } catch (error: any) {
//           console.error("Authentication error:", error);
//           if (error.response?.data?.message) {
//             throw new Error(error.response.data.message);
//           }
//           throw new Error("Authentication failed. Please check your credentials.");
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth/sign_in',
//     error: '/auth/sign_in'
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user && (user as any).token) {
//         token.accessToken = (user as any).token;
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         (session as any).accessToken = token.accessToken;
//         (session as any).user.id = token.id;
//         (session as any).user.name = token.name;
//         (session as any).user.email = token.email;
//       }
//       return session;
//     }
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: config.nextAuth.secret,
//   debug: process.env.NODE_ENV === "development",
// });