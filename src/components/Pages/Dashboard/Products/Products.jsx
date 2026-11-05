import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Delete from "./Delete";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);

        setProducts(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  if (loading) {
    return <p className="p-6">در حال دریافت محصولات...</p>;
  }

  return (
    <div className="p-6" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>

        <Link to="/dashboard/products/create" className="btn btn-primary">
          افزودن محصول
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>تصویر</th>
              <th>نام محصول</th>
              <th>دسته‌بندی</th>
              <th>قیمت</th>
              <th>تخفیف</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image || "https://placehold.co/80"}
                    alt={product.title}
                    className="w-14 h-14 object-contain rounded"
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.category || "-"}</td>

                <td>
                  {Number(product.price || 0).toLocaleString("fa-IR")} تومان
                </td>

                <td>{product.discount || 0}%</td>

                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/products/${product.id}/edit`}
                      className="btn btn-warning btn-sm"
                    >
                      ویرایش
                    </Link>

                    <Delete id={product.id} onDelete={removeProduct} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center p-8">هنوز محصولی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
