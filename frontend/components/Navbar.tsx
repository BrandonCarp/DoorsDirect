import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/Logo bk.png";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <Image
              src={logo}
              height={250}
              width={250}
              alt="Doors Direct logo"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
