import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);

        setProduct(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (data) => {
    try {
      await axios.patch(`${API_URL}/products/${id}`, data);

      navigate(`/dashboard/products/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!product) {
    return <p className="p-6">در حال دریافت اطلاعات محصول...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">ویرایش محصول</h2>

      <ProductForm
        product={product}
        onSubmit={updateProduct}
        buttonText="ذخیره تغییرات"
      />
    </div>
  );
};

export default Edit;
