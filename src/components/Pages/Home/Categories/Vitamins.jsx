import { FaChevronLeft } from "react-icons/fa";
import ProductSlider from "../Slider/ProductSlider";

const Vitamins = ({ vitamins = {} }) => {
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("fa-IR");
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 px-4" dir="rtl">
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-800">
              {vitamins.title}
            </h2>

            <p className="text-xs text-gray-500 mt-1">{vitamins.subtitle}</p>
          </div>

          <a
            href={vitamins.moreLink}
            className="text-sm text-sky-600 flex items-center gap-2"
          >
            مشاهده همه
            <FaChevronLeft size={11} />
          </a>
        </div>

        <ProductSlider
          products={vitamins.products || []}
          itemWidth="w-37.5 lg:w-41"
          renderItem={(product) => (
            <a
              href={product.link}
              dir="rtl"
              className="w-full border border-gray-200 rounded-md overflow-hidden flex flex-col justify-between p-2 hover:shadow-md transition"
            >
              <div className="w-full h-41 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-300 text-4xl">📦</div>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <h3 className="text-xs text-gray-700 leading-6 line-clamp-2 h-12">
                  {product.title}
                </h3>

                <div className="flex flex-col gap-1">
                  {product.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs rounded px-1">
                        {product.discount.toLocaleString("fa-IR")}٪
                      </span>

                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1">
                    <span className="text-sm font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>

                    <span className="text-xs text-gray-600">تومان</span>
                  </div>
                </div>
              </div>
            </a>
          )}
        />
      </div>
    </section>
  );
};

export default Vitamins;
