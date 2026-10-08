// Small shared UI pieces for the quote-hub sections (door builder, LiftMaster).

export const inputClass =
  "rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-bg outline-none transition focus:border-red-main focus:ring-2 focus:ring-red-main/20";

export function Panel({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <header className="flex items-center gap-3 bg-gray-bg px-4 py-2.5">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-main text-xs font-bold text-white">
          {step}
        </span>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </header>
      <div className="grid gap-4 p-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-gray-bg">{label}</span>
      {children}
    </label>
  );
}
