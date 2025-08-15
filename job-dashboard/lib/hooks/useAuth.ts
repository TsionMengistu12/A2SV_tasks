import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";

    const logout = async () => {
        await signOut({ redirect: false });
        router.push("/auth/sign_in");
    };

    const redirectToLogin = () => {
        router.push("/auth/sign_in");
    };

    const redirectToDashboard = () => {
        router.push("/");
    };

    return {
        session,
        user: session?.user,
        isAuthenticated,
        isLoading,
        logout,
        redirectToLogin,
        redirectToDashboard,
    };
};
