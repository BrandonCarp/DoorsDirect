export default function ezdoor() {
  return (
    <div className="flex flex-col">
      <iframe
        src="https://ezdoor.clopay.com?propid=123456"
        height="800px"
        width="1507px"
        allow="geolocation"
        className="w-full"
      ></iframe>
    </div>
  );
}
