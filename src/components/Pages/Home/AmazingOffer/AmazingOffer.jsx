import { API_URL } from "../../../../api.js";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AmazingOffers = () => {
  const [products, setProducts] = useState([]);
  const [time, setTime] = useState({
    hours: 27,
    minutes: 38,
    seconds: 1,
  });

  const carouselRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/amazingOffers`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <section className="w-full max-w-334 mx-auto mt-8 px-2 sm:px-4">
      <div className="bg-linear-to-br from-[#d22c4e] to-[#ee384e] rounded-2xl p-3 md:p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-white text-3xl font-black">شگفت‌انگیز</div>

            <div className="hidden sm:block w-px h-10 bg-white/30"></div>

            <div className="flex items-center gap-1" dir="ltr">
              {[time.hours, time.minutes, time.seconds].map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="bg-white text-gray-800 rounded-md w-9 h-9 flex items-center justify-center font-bold">
                    {String(item).padStart(2, "0")}
                  </div>

                  {index !== 2 && (
                    <span className="text-white font-bold">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <a
            href="/incredible-offers/"
            className="text-white text-sm flex items-center gap-2 hover:opacity-80"
          >
            مشاهده همه
            <FaChevronLeft size={12} />
          </a>
        </div>

        <div className="relative bg-white rounded-xl p-2 sm:p-3">
          <button
            onClick={prevSlide}
            className="hidden md:flex btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          <div
            ref={carouselRef}
            className="carousel carousel-center w-full gap-2 rounded-lg"
            dir="rtl"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="carousel-item w-36.25 sm:w-42.5 md:w-47.5"
              >
                <a
                  href={product.link}
                  className="w-full flex flex-col justify-between gap-3 p-2 rounded-lg hover:shadow-md transition"
                >
                  <div className="w-full aspect-square flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="text-xs sm:text-sm text-gray-700 leading-6 line-clamp-2 h-12">
                    {product.title}
                  </h3>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {product.discount.toLocaleString("fa-IR")}٪
                      </span>

                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-1">
                      <span className="text-sm sm:text-base font-bold text-gray-800">
                        {formatPrice(product.price)}
                      </span>

                      <span className="text-xs text-gray-600">تومان</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="hidden md:flex btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AmazingOffers;
