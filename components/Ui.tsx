/** Summary:
 * Tiny reusable UI helpers (keeps pages clean).
 */
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

export function Btn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50 ${props.className || ""}`}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 ${props.className || ""}`}
    />
  );
}
