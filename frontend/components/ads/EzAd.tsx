import Link from "next/link";
import Image from "next/image";
import { SwatchIcon } from "@heroicons/react/24/outline";
import ezdoorphone from "@/public/images/ezdoorphone.png";

export default function EzAd() {
  return (
    <section className="w-full bg-cream-secondary px-4 py-10 md:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-sm rounded-lg bg-white">
          <Image
            src={ezdoorphone}
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            alt="Clopay EZDoor visualizer on a phone"
            className="object-contain p-4"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-main">
            Door Visualizer
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-gray-bg md:text-4xl">
            See the door on your home before you choose.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
            Clopay EZDoor makes choosing the right garage door easier. Upload a
            photo of your home, preview styles, and feel confident before
            requesting pricing.
          </p>
          <Link
            href="/ezdoor"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-secondary"
          >
            <SwatchIcon className="h-5 w-5" />
            Try EZDoor
          </Link>
        </div>
      </div>
    </section>
  );
}
