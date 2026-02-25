import Image from "next/image";

export default function Home() {
  return (
    // className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    <div className="">
      <iframe
        src="https://ezdoor.clopay.com?propid=123456"
        height="1170px"
        width="2010px"
        allow="geolocation"
        className="border-0 overflow-hidden"
      ></iframe>
    </div>
  );
}
