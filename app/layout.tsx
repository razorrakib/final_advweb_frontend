/** Summary:
 * Root layout: applies global blue/white theme, consistent header+footer.
 */
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
