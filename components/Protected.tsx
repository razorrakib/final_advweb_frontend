/** Summary:
 * Client-side guard: redirects if no token or wrong role.
 * Keeps code minimal without middleware.
 */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, Role } from "@/lib/auth";

export default function Protected({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.token) return router.replace("/");
    if (auth.role !== role) return router.replace("/");
  }, [router, role]);

  return <>{children}</>;
}
