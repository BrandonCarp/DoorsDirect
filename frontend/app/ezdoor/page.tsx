export default function EzDoor() {
  // TODO: Replace propid=123456 with the real Clopay EzDoor property ID for
  // Doors Direct. The 123456 value is a placeholder and must be updated before
  // launch or the designer won't be tied to this business.
  return (
    <div className="flex flex-col">
      <iframe
        title="Clopay EzDoor garage door designer"
        src="https://ezdoor.clopay.com?propid=123456"
        height="800"
        allow="geolocation"
        className="w-full min-h-[800px]"
      ></iframe>
    </div>
  );
}
