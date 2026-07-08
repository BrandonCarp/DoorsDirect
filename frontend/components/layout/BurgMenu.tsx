interface BurgMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function BurgMenu({ isOpen, setIsOpen }: BurgMenuProps) {
  return (
    <li className=" text-red-main hover:text-red-secondary list-none block lg:hidden ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 inline-flex flex-col items-center justify-center gap-[5px]  rounded-md p-1 hover:cursor-pointer lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        {/* Top bar */}
        <span
          className={`block w-9 h-[3px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        {/* Middle bar */}
        <span
          className={`block w-9 h-[3px] bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        {/* Bottom bar */}
        <span
          className={`block w-9 h-[3px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>
    </li>
  );
}
