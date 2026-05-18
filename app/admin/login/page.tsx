/** Summary:
 * Admin login: Zod validate -> POST /auth/admin/login -> store token -> redirect /admin.
 * Backend returns: { access_token, role, name }.
 */
"use client";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { Card, Btn, Input } from "@/components/Ui";
import type { LoginRes } from "@/types/api";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) return setErr(parsed.error.errors[0].message);

    try {
      const { data } = await api.post<LoginRes>(
        "/auth/admin/login",
        parsed.data,
      ); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      saveAuth({ token: data.access_token, role: "admin", name: data.name });
      router.push("/admin");
    } catch (ex: any) {
      setErr(ex?.response?.data?.message || "Login failed");
    }
  }

  return (
    <Card>
      <h1 className="text-xl font-bold text-blue-800">Admin Login</h1>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Btn type="submit">Login</Btn>
      </form>
    </Card>
  );
}
