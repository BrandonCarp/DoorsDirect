export default function EzDoor() {
  // TODO: Replace propid=123456 with the real Clopay EzDoor property ID for
  // Doors Direct. The 123456 value is a placeholder and must be updated before
  // launch or the designer won't be tied to this business.
  //
  // The designer fills the visible screen (viewport minus the sticky navbar)
  // so the whole tool is usable without scrolling; the footer sits below.
  return (
    <div className="flex flex-col">
      <iframe
        title="Clopay EzDoor garage door designer"
        src="https://ezdoor.clopay.com?propid=123456"
        allow="geolocation"
        className="w-full h-[calc(100dvh-96px)] min-h-[640px]"
      ></iframe>
    </div>
  );
}
