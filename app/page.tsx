/** Summary:
 * Home page: simple landing + nav shortcuts (flowchart).
 * Customer/Rider links are placeholders until backend exists.
 */
import Link from "next/link";
import { Card } from "@/components/Ui";

export default function Home() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-blue-800">
          Welcome to ShopCart
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          A simple shopping platform with Admin + Manager dashboards.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            href="/admin/login"
          >
            Admin Login
          </Link>
          <Link
            className="rounded-lg border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            href="/manager/login"
          >
            Manager Login
          </Link>
          <Link
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            href="/manager/signup"
          >
            Manager Signup
          </Link>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-blue-800">
          Product Showcase (placeholder)
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-blue-50" />
          ))}
        </div>
      </Card>
    </div>
  );
}
