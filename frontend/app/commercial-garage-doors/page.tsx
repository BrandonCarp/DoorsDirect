import DoorBox from "@/components/products/DoorBox";
import doors from "@/Data/ComDoors.json";

export default function Commercial() {
  return (
    <div className=" pt-24  lg:mx-10 ">
      <span className=" text-lg lg:text-3xl  text-red-main ml-4 ">
        Clopay Commercial Doors
      </span>
      <div className="mx-5 border-b border-gray-300 pt-3 flex justify-center items-center  " />
      <div className="lg:grid grid-cols-2">
        {doors.map((doors) => (
          <DoorBox key={doors.id} doors={doors} />
        ))}
      </div>
    </div>
  );
}
