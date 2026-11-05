import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Delete from "./Delete";

const Show = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setProduct(null);
      setNotFound(false);

      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);

        if (!res.data || !res.data.id) {
          setNotFound(true);
        } else {
          setProduct(res.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          console.log(error.message);
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-5 text-center" dir="rtl">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-3">در حال دریافت اطلاعات محصول...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div
        className="min-h-[400px] flex flex-col items-center justify-center text-center p-5"
        dir="rtl"
      >
        <div className="text-7xl mb-5">🔍</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          محصول موردنظر پیدا نشد!
        </h2>

        <p className="text-gray-500 mb-6">
          محصولی با این شناسه وجود ندارد یا ممکن است حذف شده باشد.
        </p>

        <Link to="/dashboard/products" className="btn btn-primary btn-sm">
          بازگشت به محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5" dir="rtl">
      <h2 className="text-2xl font-bold">جزئیات محصول</h2>

      <div className="card bg-base-100 border border-base-300 shadow-sm max-w-xl">
        <figure className="bg-base-200 p-5">
          <img
            src={product.image}
            alt={product.title}
            className="h-56 object-contain"
          />
        </figure>

        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>

          <p>{product.body || product.description}</p>

          <p className="font-bold">
            قیمت: {Number(product.price || 0).toLocaleString("fa-IR")} تومان
          </p>

          <div className="card-actions justify-start mt-4">
            <Link to="/dashboard/products" className="btn btn-primary btn-sm">
              بازگشت
            </Link>

            <Link
              to={`/dashboard/products/edit/${product.id}`}
              className="btn btn-warning btn-sm"
            >
              ویرایش
            </Link>

            <Delete id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
