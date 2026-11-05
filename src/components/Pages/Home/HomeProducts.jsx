import { API_URL } from "../../../api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Cart/cartSlice";
import { toast } from "react-toastify";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("محصول به سبد خرید اضافه شد");
  };

  return (
    <section className="container mx-auto px-4 py-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">همه محصولات</h2>

        <Link to="/dashboard/products" className="text-sm text-primary">
          مدیریت محصولات
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition"
          >
            <figure className="p-4">
              <img
                src={product.image || "https://placehold.co/300"}
                alt={product.title}
                className="h-40 w-full object-contain"
              />
            </figure>

            <div className="card-body p-4 gap-3">
              <h3 className="text-sm font-medium line-clamp-2 min-h-10">
                {product.title}
              </h3>

              {product.category && (
                <span className="text-xs text-gray-500">
                  {product.category}
                </span>
              )}

              <div className="flex justify-between items-center">
                <div>
                  {product.oldPrice > product.price && (
                    <p className="text-xs line-through text-gray-400">
                      {Number(product.oldPrice).toLocaleString("fa-IR")}
                    </p>
                  )}

                  <p className="font-bold text-sm">
                    {Number(product.price || 0).toLocaleString("fa-IR")} تومان
                  </p>
                </div>

                {product.discount > 0 && (
                  <span className="badge badge-error text-white">
                    {product.discount}%
                  </span>
                )}
              </div>

              {/* <Link
                to={product.link || "#"}
                className="btn btn-outline btn-sm"
                target={product.link ? "_blank" : undefined}
              >
                مشاهده محصول
              </Link> */}

              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary btn-sm w-full"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;
