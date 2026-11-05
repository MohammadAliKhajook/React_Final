import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductSlider = ({
  products = [],
  renderItem,
  itemWidth = "w-[164px]",
}) => {
  const carouselRef = useRef(null);

  const nextSlide = () => {
    carouselRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    carouselRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={prevSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white border border-gray-200 shadow-md"
      >
        <FaChevronRight size={13} />
      </button>

      <div
        ref={carouselRef}
        dir="ltr"
        className="carousel carousel-center w-full gap-3 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className={`carousel-item ${itemWidth}`}>
            {renderItem(product)}
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white border border-gray-200 shadow-md"
      >
        <FaChevronLeft size={13} />
      </button>
    </div>
  );
};

export default ProductSlider;
