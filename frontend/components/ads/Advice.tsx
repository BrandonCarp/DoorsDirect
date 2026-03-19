import Image from "next/image";
import spring from "@/public/DoorImages/GeneralPhotos/spring.png";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
export default function Springs() {
  return (
    <div className="w-[320px] ">
      <div className="flex flex-col items-center  bg-white mx-5 py-5 rounded-lg gap-3 ">
        <UserCircleIcon className="h-8 w-8 text-red-main" />
        <span className="text-red-main font-semibold text-lg ">
          Get In Touch
        </span>
        <p className="mx-5 text-sm text-center text-red-main text-[17px] mb-5">
          Need help finding the right door or part? Reach out to our team for
          quick answers, product details, and expert guidance.
        </p>
        <Link
          href="/contact-us"
          className="rounded  font-semibold bg-red-main text-white px-4 py-3 text-sm hover:bg-red-secondary hover:text-white  "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
