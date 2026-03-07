"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";

interface Props {
  children: React.ReactNode;
}

const privateRoutes = ["/profile", "/notes"];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();

          const isPrivate = privateRoutes.some((route) =>
            pathname.startsWith(route),
          );

          if (isPrivate) {
            await logout().catch(() => null);
            router.replace("/sign-in");
            return;
          }
        }
      } catch {
        clearIsAuthenticated();

        const isPrivate = privateRoutes.some((route) =>
          pathname.startsWith(route),
        );

        if (isPrivate) {
          router.replace("/sign-in");
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
