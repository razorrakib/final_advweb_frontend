/** Summary:
 * Admin dashboard (protected): loads lists + analytics from /admin/* endpoints.
 * Supports delete manager/product with respective routes.
 */
"use client";
import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { Card, Btn } from "@/components/Ui";
import { api } from "@/lib/api";
import { logout } from "@/lib/auth";
import type { SalesTotals, BestShopRow } from "@/types/api";

export default function AdminPage() {
  return (
    <Protected role="admin">
      <AdminInner />
    </Protected>
  );
}

function AdminInner() {
  const [sales, setSales] = useState<SalesTotals | null>(null);
  const [best, setBest] = useState<BestShopRow[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const [salesRes, bestRes, mgrRes, prodRes] = await Promise.all([
      api.get("/admin/analytics/sales"), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api.get("/admin/analytics/shops"), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api.get("/admin/managers"), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api.get("/admin/products"), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    ]);
    setSales(salesRes.data);
    setBest(bestRes.data);
    setManagers(mgrRes.data);
    setProducts(prodRes.data);
  }

  useEffect(() => {
    load().catch(() => setMsg("Failed to load admin data"));
  }, []);

  async function delManager(id: number) {
    await api.delete(`/admin/manager/${id}`); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Manager deleted");
    load();
  }

  async function delProduct(id: number) {
    await api.delete(`/admin/product/${id}`); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Product deleted");
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
        <Btn
          onClick={() => {
            logout();
            location.href = "/";
          }}
          className="bg-slate-700 hover:bg-slate-800"
        >
          Logout
        </Btn>
      </div>

      {msg && <p className="text-sm text-slate-600">{msg}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-blue-800">Total Sales</h2>
          <p className="mt-2 text-sm text-slate-700">
            Revenue: <b>{sales?.totalRevenue ?? 0}</b> | Orders:{" "}
            <b>{sales?.totalOrders ?? 0}</b>
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold text-blue-800">
            Best Shops (by revenue)
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {best?.slice(0, 5).map((r, i) => (
              <li key={i}>
                Shop #{r.shopId} — Revenue: {r.revenue} — Orders: {r.orderCount}
              </li>
            ))}
            {!best?.length && <li className="text-slate-500">No data yet</li>}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold text-blue-800">Managers</h2>
        <div className="mt-3 space-y-2 text-sm">
          {managers.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-slate-600">{m.email}</div>
              </div>
              <Btn
                onClick={() => delManager(m.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Btn>
            </div>
          ))}
          {!managers.length && <p className="text-slate-500">No managers</p>}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-blue-800">Products</h2>
        <div className="mt-3 space-y-2 text-sm">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-slate-600">
                  Price: {p.price} | Stock: {p.stock}
                </div>
              </div>
              <Btn
                onClick={() => delProduct(p.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Btn>
            </div>
          ))}
          {!products.length && <p className="text-slate-500">No products</p>}
        </div>
      </Card>
    </div>
  );
}
