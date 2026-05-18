/** Summary:
 * Consistent footer (blue). Mirrors your provided layout: brand, quick links, platform.
 */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">ShopCart</h3>
          <p className="mt-2 text-sm text-blue-100">
            All your products in one platform. Happy Shopping!
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-100">
            <li>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/admin/login">
                Admin Login
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/manager/login">
                Manager Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Platform</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-100">
            <li>Fast Delivery</li>
            <li>Secure Payment</li>
            <li>Powerful Dashboard</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 py-4 text-center text-xs text-blue-200">
        © 2026 ShopCart. All rights reserved.
      </div>
    </footer>
  );
}
