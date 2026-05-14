import Link from "next/link";

export default function HeroHeader() {
  return (
    <>
      <div className="flex flex-col items-center  text-center mt-10">
        {/* Quote // Doors */}
        <section>
          <p>Wholesale Garage Doors & Parts Built for Pros</p>
          <p>
            Premium inventory, competitive pricing, and the fastest fulfillment.
            Everything you need to get the job done right.
          </p>
          <div>
            <Link
              href="/quotes"
              className="bg-red-main text-white font-semibold text-4xl px-4 py-2 rounded cursor:pointer"
            >
              Get a Quote
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
