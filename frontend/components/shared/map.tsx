export default function Map() {
  return (
    <div className="w-[100vw] h-[50vh] md:w-[700px] md:h-[610px]">
      <iframe
        title="Doors Direct South location map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12230.089066687613!2d-75.0494324!3d39.9744326!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ca173fb98655%3A0xbbe06fd0eaa6f5f8!2sDoors%20Direct%20South%20LLC!5e0!3m2!1sen!2sus!4v1773171778613!5m2!1sen!2sus"
        className="w-full h-full px-5"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
