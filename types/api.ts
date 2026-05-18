/** Summary:
 * Minimal API response typing for your backend endpoints.
 */
export type LoginRes = { access_token: string; role: "admin" | "manager"; name: string; hasShop?: boolean };

export type ManagerProfile = { id: number; name: string; email: string; phone: string; shop?: any };

export type Shop = { id: number; name: string; creationDate: string; products?: Product[] };

export type Product = { id: number; name: string; description?: string; price: number; stock: number; image?: string };

export type SalesTotals = { totalRevenue: number; totalOrders: number; shopId?: number };

export type BestShopRow = { shopId: number; orderCount: string; revenue: string };

export type Order = { id: number; totalPrice: number; status: string; address: string; customerId: number; shopId: number; productNames: string; createdAt: string };
