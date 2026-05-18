/** Summary:
 * Manager dashboard (protected): uses /manager/profile + /shop/mine.
 * If no shop exists: create via POST /shop.
 * Manage products via /product endpoints; view analytics via /product/analytics and /order/mine/analytics.
 */
"use client";
import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { Card, Btn, Input } from "@/components/Ui";
import { api } from "@/lib/api";
import { logout } from "@/lib/auth";
import type { Shop, Product, SalesTotals, Order } from "@/types/api";

export default function ManagerPage() {
  return (
    <Protected role="manager">
      <ManagerInner />
    </Protected>
  );
}

function ManagerInner() {
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<SalesTotals | null>(null);
  const [top, setTop] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  const [shopName, setShopName] = useState("");
  const [newP, setNewP] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  async function loadAll() {
    setMsg("");
    try {
      const shopRes = await api.get<Shop>("/shop/mine"); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      setShop(shopRes.data);
      setProducts(shopRes.data.products || []);
    } catch {
      setShop(null); // likely "You do not have a shop yet"
    }

    const [pRes, oRes, sRes, topRes] = await Promise.all([
      api
        .get<Product[]>("/product/mine")
        .catch(() => ({ data: [] as Product[] })), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api.get<Order[]>("/order/mine").catch(() => ({ data: [] as Order[] })), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api
        .get<SalesTotals>("/order/mine/analytics")
        .catch(() => ({ data: null as any })), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
      api
        .get("/product/analytics")
        .catch(() => ({ data: { topProducts: [] } })), // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    ]);

    setProducts(pRes.data);
    setOrders(oRes.data);
    setSales(sRes.data);
    setTop(topRes.data?.topProducts || []);
  }

  useEffect(() => {
    loadAll().catch(() => setMsg("Failed to load manager data"));
  }, []);

  async function createShop() {
    if (!shopName.trim()) return setMsg("Shop name required");
    await api.post("/shop", { name: shopName }); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Shop created!");
    setShopName("");
    loadAll();
  }

  async function addProduct() {
    const price = Number(newP.price),
      stock = Number(newP.stock);
    if (!newP.name.trim() || isNaN(price) || isNaN(stock))
      return setMsg("Valid name, price, stock required");
    await api.post("/product", {
      name: newP.name,
      price,
      stock,
      description: newP.description || undefined,
    }); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Product added!");
    setNewP({ name: "", price: "", stock: "", description: "" });
    loadAll();
  }

  async function updateProduct(id: number, patch: Partial<Product>) {
    await api.patch(`/product/${id}`, patch); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Product updated");
    loadAll();
  }

  async function deleteProduct(id: number) {
    await api.delete(`/product/${id}`); // [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
    setMsg("Product deleted");
    loadAll();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-blue-800">Manager Dashboard</h1>
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

      {!shop ? (
        <Card>
          <h2 className="font-semibold text-blue-800">Create Your Shop</h2>
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <Btn onClick={createShop}>Create</Btn>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Backend allows only ONE shop per manager.
            [1](https://aiubedu60714-my.sharepoint.com/personal/22-47085-1_student_aiub_edu/Documents/Microsoft%20Copilot%20Chat%20Files/shopcart-backend.md.pdf)
          </p>
        </Card>
      ) : (
        <Card>
          <h2 className="font-semibold text-blue-800">My Shop</h2>
          <p className="mt-2 text-sm text-slate-700">
            <b>{shop.name}</b> (Shop #{shop.id})
          </p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-blue-800">Sales Analytics</h2>
          <p className="mt-2 text-sm text-slate-700">
            Revenue: <b>{sales?.totalRevenue ?? 0}</b> | Completed Orders:{" "}
            <b>{sales?.totalOrders ?? 0}</b>
          </p>
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-blue-800">
              Top Products
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {top.slice(0, 5).map((x: any, i: number) => (
                <li key={i}>
                  {x.productNames} — count: {x.count}
                </li>
              ))}
              {!top.length && <li className="text-slate-500">No data yet</li>}
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-blue-800">Add Product</h2>
          <div className="mt-3 space-y-2">
            <Input
              placeholder="Name"
              value={newP.name}
              onChange={(e) => setNewP({ ...newP, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              value={newP.price}
              onChange={(e) => setNewP({ ...newP, price: e.target.value })}
            />
            <Input
              placeholder="Stock"
              value={newP.stock}
              onChange={(e) => setNewP({ ...newP, stock: e.target.value })}
            />
            <Input
              placeholder="Description (optional)"
              value={newP.description}
              onChange={(e) =>
                setNewP({ ...newP, description: e.target.value })
              }
            />
            <Btn onClick={addProduct}>Add</Btn>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold text-blue-800">My Products</h2>
        <div className="mt-3 space-y-2 text-sm">
          {products.map((p) => (
            <div key={p.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-slate-600">
                    Price: {p.price} | Stock: {p.stock}
                  </div>
                </div>
                <Btn
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Btn>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                <Input
                  placeholder="New price"
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      updateProduct(p.id, {
                        price: Number((e.target as HTMLInputElement).value),
                      });
                  }}
                />
                <Input
                  placeholder="New stock"
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      updateProduct(p.id, {
                        stock: Number((e.target as HTMLInputElement).value),
                      });
                  }}
                />
                <span className="col-span-2 text-xs text-slate-500 md:col-span-2">
                  Tip: press Enter to apply update.
                </span>
              </div>
            </div>
          ))}
          {!products.length && (
            <p className="text-slate-500">No products yet</p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-blue-800">My Orders</h2>
        <div className="mt-3 space-y-2 text-sm">
          {orders.slice(0, 10).map((o) => (
            <div key={o.id} className="rounded-lg border p-3">
              <div className="font-semibold">
                Order #{o.id} — {o.status}
              </div>
              <div className="text-slate-600">
                Total: {o.totalPrice} | Products: {o.productNames}
              </div>
              <div className="text-slate-600">Address: {o.address}</div>
            </div>
          ))}
          {!orders.length && <p className="text-slate-500">No orders</p>}
        </div>
      </Card>
    </div>
  );
}
