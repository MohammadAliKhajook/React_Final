import { API_URL } from "../../../../api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const Create = () => {
  const navigate = useNavigate();

  const createProduct = async (data) => {
    try {
      await axios.post(`${API_URL}/products`, data);
      navigate("/dashboard/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">افزودن محصول جدید</h2>

      <ProductForm onSubmit={createProduct} buttonText="ثبت محصول" />
    </div>
  );
};

export default Create;
