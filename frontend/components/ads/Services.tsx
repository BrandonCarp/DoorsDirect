import Image from "next/image";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import springLogo from "@/public/images/spring.png";
import opIcon from "@/public/images/opIcon.png";

export default function Services() {
  return (
    <div className="w-[320px] sm:w-[90vw]">
      <div className="flex flex-col items-center justify-center  space-y-3 md:bg-white rounded-md px-5 py-5">
        <span className="text-red-main">Services</span>
        <span className="text-red-main font-bold md:text-lg">
          What do we offer ?
        </span>
        <p className="text-sm font-semibold text-red-main mx-3 md:text-xl">
          Reliable doors, trusted brands,
          <span> and the parts professionals depend on.</span>
        </p>
        <section className=" flex flex-col items-center justify-center gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3  md:content-evenly">
          {/* Service and hours*/}
          <div className=" bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingStorefrontIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main mt-2">We're Open</span>
            <p className="text-sm ">
              Skip the wait our warehouse is fully stocked with garage doors and
              springs available for same-day pickup. Visit us Monday to Friday 7
              to 5 or Saturday 7 to 12 and get back on track today.
            </p>
          </div>
          {/* Residential Doors & equipment*/}
          <div className="bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <HomeModernIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main mt-2">
              Residential Doors
            </span>
            <p className="text-sm ">
              We stock a wide range of residential garage doors including
              economical non-insulated steel, high R-value insulated doors,
              vinyl, wood, and classic carriage house styles. Quality options
              ready for contractors and homeowners alike.
            </p>
          </div>
          {/* Commercial Doors & equipment*/}
          <div className="bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <BuildingOffice2Icon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main mt-2">
              Commercial Doors
            </span>
            <p className="text-sm ">
              From sectional overhead doors to heavy-duty rolling steel doors,
              we supply dependable commercial solutions. We also carry loading
              dock equipment, replacement slats, and door sections to keep
              businesses operating smoothly.
            </p>
          </div>
          {/* Parts department*/}
          <div className="bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <WrenchScrewdriverIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main mt-2">Springs</span>
            <p className="text-sm ">
              Our spring department is stocked with torsion and extension
              springs, cables, pulleys, tracks, and rollers. We carry the parts
              professionals rely on, along with weatherstripping, hardware, and
              essential door components.
            </p>
          </div>
          {/* Openers, remotes, keypads*/}
          <div className="bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <Image
                src={opIcon}
                alt="Operator Icon"
                width={70}
                height={70}
                className="w-[85%]"
                quality={100}
              />
            </div>
            <span className="font-semibold text-red-main mt-2">
              Openers & Accessories
            </span>
            <p className="text-sm ">
              We carry LiftMaster residential and commercial operators including
              trolley systems, jackshaft openers, remotes, and wireless keypads.
              Reliable automation solutions trusted by installers and property
              owners.
            </p>
          </div>
          {/* Brands we work with*/}
          <div className="bg-white rounded px-5 py-5 flex flex-col ">
            <div className="bg-red-main w-9 h-9  flex items-center justify-center rounded-full ">
              <NewspaperIcon className="h-6 w-6  text-white  " />
            </div>
            <span className="font-semibold text-red-main mt-2">
              Brands we supply
            </span>
            <p className="text-sm ">
              We supply products from leading manufacturers including Clopay,
              Wayne Dalton, Haas, C.H.I., Amarr, and LiftMaster. Trusted brands
              known for durability, performance, and long-lasting quality.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
// 5. Openers, remotes, keypads
// 6. Brands we work with
