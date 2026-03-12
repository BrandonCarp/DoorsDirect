import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/outline";

export default function Services() {
  return (
    <div className="w-[90%]">
      <div className="flex flex-col items-center justify-center  space-y-3 bg-white rounded-lg px-10 py-5">
        <span className="text-red-secondary">Services</span>
        <span className="text-red-main font-bold">What do we offer ?</span>
        <p className="text-sm">all of the things lets goooooooo</p>
        <section className="grid grid-cols-3 gap-4 content-evenly">
          {/* Service and hours*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingStorefrontIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">We're Open</span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
          {/* Residential Doors & equipment*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <HomeModernIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">
              Residential Doors & equipment
            </span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
          {/* Commercial Doors & equipment*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingOffice2Icon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">
              Commercial Doors & Equipment
            </span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
          {/* Parts department*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <WrenchScrewdriverIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">
              Parts department
            </span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
          {/* Openers, remotes, keypads*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingStorefrontIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">
              Openers, remotes, keypads
            </span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
          {/* Brands we work with*/}
          <div>
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingStorefrontIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main">
              Brands we work with
            </span>
            <p className="text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              magnam vitae repudiandae quia maiores culpa, accusantium id modi
              quibusdam nihil, facilis vel ratione. Soluta quidem saepe
              voluptatibus non quaerat ullam.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
// 5. Openers, remotes, keypads
// 6. Brands we work with
