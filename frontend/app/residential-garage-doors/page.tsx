import DoorBox from "@/components/products/DoorBox";
import doors from "@/Data/ResiDoors.json";

export default function Residential() {
  return (
    <main className="bg-cream-bg px-4 pt-28 pb-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-main">
          Residential Catalog
        </p>
        <div className="mt-3 flex flex-col gap-4 border-b border-gray-300 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-bg md:text-5xl">
              Clopay Residential Doors
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
              Explore premium garage door collections, compare styles, and open
              each product page for details, brochures, galleries, and quote
              options.
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {doors.length} collections
          </span>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doors.map((doors) => (
          <DoorBox
            key={doors.id}
            basePath="/residential-garage-doors"
            doors={doors}
          />
        ))}
      </section>
    </main>
  );
}
