/** Summary:
 * Simple top nav (blue/white). Links match your flowchart pages.
 */
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          ShopCart
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/login" className="hover:underline">
            Admin
          </Link>
          <Link href="/manager/login" className="hover:underline">
            Manager
          </Link>
          <Link href="/manager/signup" className="hover:underline">
            Manager Signup
          </Link>
        </nav>
      </div>
    </header>
  );
}
