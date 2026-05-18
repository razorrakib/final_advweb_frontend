/** Summary:
 * Manager signup: Zod validate -> POST /manager/signup -> redirect to login.
 */
"use client";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card, Btn, Input } from "@/components/Ui";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(6),
});

export default function ManagerSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setOk("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) return setErr(parsed.error.errors[0].message);

    try {
      await api.post("/manager/signup", parsed.data); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      setOk("Manager created. Please login.");
      setTimeout(() => router.push("/manager/login"), 600);
    } catch (ex: any) {
      setErr(ex?.response?.data?.message || "Signup failed");
    }
  }

  return (
    <Card>
      <h1 className="text-xl font-bold text-blue-800">Manager Signup</h1>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        {ok && <p className="text-sm text-green-600">{ok}</p>}
        <Btn type="submit">Create Account</Btn>
      </form>
    </Card>
  );
}
