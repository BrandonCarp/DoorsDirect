import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-cream-bg px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-gray-bg md:text-5xl">
        That page rolled away.
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-gray-700">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try
        the catalogs below, or request a quote and we&apos;ll point you right.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-red-main px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-red-secondary"
        >
          Back Home
        </Link>
        <Link
          href="/residential-garage-doors"
          className="inline-flex items-center justify-center rounded-md border border-red-main bg-white px-6 py-3 text-base font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
        >
          Residential Doors
        </Link>
        <Link
          href="/request-quote"
          className="inline-flex items-center justify-center rounded-md border border-red-main bg-white px-6 py-3 text-base font-semibold text-red-main transition-colors hover:bg-red-main hover:text-white"
        >
          Request a Quote
        </Link>
      </div>
    </main>
  );
}
