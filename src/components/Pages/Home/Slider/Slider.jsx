import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${API_URL}/slider`);
      const data = await response.json();

      setSlides(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden group" dir="rtl">
      <div className="relative w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full transition-transform duration-700 ease-in-out ${
              index === active
                ? "translate-x-0 relative"
                : index < active
                  ? "translate-x-full"
                  : "-translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={`اسلاید ${index + 1}`}
              className="w-full h-44 sm:h-60 md:h-80 lg:h-100 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-sm md:btn-md bg-white/90 border-none shadow-md hover:bg-white"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="btn btn-circle btn-sm md:btn-md bg-white/90 border-none shadow-md hover:bg-white"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === index
                ? "w-6 bg-white"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
