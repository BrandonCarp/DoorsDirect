import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/footerlogo.png";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Link href="/">
          <Image
            className="w-[100px] h-auto"
            src={logo}
            width={787}
            height={241}
            alt="Doors Direct logo"
            quality={100}
            sizes="100px"
            priority
          />
        </Link>
        <h1 className="text-sm">YOUR TRUSTED DOOR EXPERTS</h1>
      </div>
    </>
  );
}
