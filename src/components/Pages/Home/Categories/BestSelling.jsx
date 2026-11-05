import { API_URL } from "../../../../api.js";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useFetch from "../../Hooks/Hooks";

const BestSelling = () => {
  const { data, loading } = useFetch(`${API_URL}/bestselling`);

  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current?.scrollBy({
      left: 620,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    sliderRef.current?.scrollBy({
      left: -620,
      behavior: "smooth",
    });
  };

  if (loading) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8" dir="rtl">
      {data?.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-5">
            <img src={item.icon} alt="" className="w-6 h-6 object-contain" />
            <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
          </div>

          <div className="relative">
            <button
              onClick={nextSlide}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-md"
            >
              <FaChevronRight size={13} />
            </button>

            <div
              ref={sliderRef}
              dir="rtl"
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {Array.from(
                { length: Math.ceil(item.products.length / 3) },
                (_, index) => {
                  const products = item.products.slice(
                    index * 3,
                    index * 3 + 3,
                  );

                  return (
                    <div
                      key={index}
                      className="shrink-0 w-[280px] lg:w-[301px]"
                    >
                      {products.map((product) => (
                        <a
                          key={product.id}
                          href={product.link}
                          dir="rtl"
                          className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="w-[88px] h-[88px] shrink-0 bg-neutral-100 rounded flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl font-bold text-sky-500 shrink-0">
                              {product.rank.toLocaleString("fa-IR")}
                            </span>

                            <span className="text-xs text-gray-700 leading-6 line-clamp-2">
                              {product.title}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  );
                },
              )}
            </div>

            <button
              onClick={prevSlide}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-md"
            >
              <FaChevronLeft size={13} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BestSelling;
