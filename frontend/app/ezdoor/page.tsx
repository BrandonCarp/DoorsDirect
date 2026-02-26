export default function ezdoor() {
  return (
    <div className="flex flex-col">
      <h1>EZDoor</h1>
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
